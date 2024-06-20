/*
Copyright 2023 The Matrix.org Foundation C.I.C.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import type { TransformOptions as BabelOptions } from "@babel/core";
import generate from "@babel/generator";
import babelTransformReactJsx from "@babel/plugin-transform-react-jsx";
import t from "@babel/types";
import { type ConfigPlugin, transform as svgrTransform } from "@svgr/core";
import svgrPluginJsx from "@svgr/plugin-jsx";
import { camelCase, startCase } from "lodash-es";

/**
 * Generates `icons/$icons.json` off all the SVG icons discovered in the
 * `icons/` folder
 */
export default async function generateIconTokens(): Promise<void> {
  const outputFileName = "$icons.json";
  const folder = "icons/";
  const iconsFolder = fileURLToPath(new URL("../../icons/", import.meta.url));
  const webOutput = fileURLToPath(
    new URL("../../assets/web/icons/", import.meta.url),
  );

  const files = await fs.readdir(iconsFolder);

  const icons = files.filter((asset) => asset.endsWith(".svg"));

  const manifest: Record<string, { value: string; type: "icon" }> = {};

  // List of statements to be added to the assets/web/icons/index.js file
  const statements = [];

  for (const icon of icons) {
    const assetPath = path.join(iconsFolder, icon);
    const parsedPath = path.parse(assetPath);
    const svg = await fs.readFile(assetPath, "utf-8");

    manifest[parsedPath.name] = {
      value: `${folder}${parsedPath.base}`,
      type: "icon",
    };

    // Compute the component name
    // mic-on.svg -> MicOnIcon
    const componentName = `${startCase(camelCase(parsedPath.name)).replace(/\s/g, "")}Icon`;

    // This generates a React component for the icon
    const result = await svgrTransform(
      svg,
      {
        plugins: [svgrPluginJsx as unknown as ConfigPlugin],
        icon: true,
        jsxRuntime: "automatic",
        jsx: {
          babelConfig: {
            plugins: [
              {
                // For some reason, svgr emits ESM code but without specifying the sourceType, it is treated as CommonJS
                // This patches the sourceType so that the JSX transform also emits ESM code
                visitor: {
                  Program(program) {
                    program.node.sourceType = "module";
                  },
                },
              },
              [babelTransformReactJsx, { runtime: "automatic" }],
            ],
          } satisfies BabelOptions,
        },

        // Custom template which uses a function instead of an arrow function and sets the component displayName
        template(variables, { tpl }) {
          return tpl`
          ${variables.imports};

          function ${variables.componentName}(${variables.props}) {
            return (
              ${variables.jsx}
            );
          };
          ${variables.componentName}.displayName = '${variables.componentName}'

          ${variables.exports};
        `;
        },
      },
      {
        componentName,
      },
    );

    // Write the react component to the web output folder
    await fs.writeFile(
      path.join(webOutput, `${parsedPath.name}.js`),
      result,
      "utf-8",
    );

    // Generate a .d.ts (typescript declaration) file for the icon
    const dTs = `import * as React from "react";

/**
 * ${parsedPath.base}
 */
declare const ${componentName}: React.FunctionComponent<
    React.ComponentProps<"svg">
>;

export default ${componentName};
`;

    await fs.writeFile(
      path.join(webOutput, `${parsedPath.name}.d.ts`),
      dTs,
      "utf-8",
    );

    // Add the import statement to the list of statements for the index.js
    //   import { default as SomeIcon } from "./some-icon.js";
    statements.push(
      t.exportNamedDeclaration(
        null,
        [
          t.exportSpecifier(
            t.identifier("default"),
            t.identifier(componentName),
          ),
        ],
        t.stringLiteral(`./${parsedPath.name}.js`),
      ),
    );
  }

  // Generate the index.js file
  const program = t.program(statements, [], "module");
  const result = generate.default(program).code;

  await fs.writeFile(path.join(webOutput, "index.js"), result, "utf-8");
  // The index.d.ts is identical to the index as it only re-exports the icons
  await fs.writeFile(path.join(webOutput, "index.d.ts"), result, "utf-8");

  // Write the icons manifest to the icons folder
  await fs.writeFile(
    path.join(iconsFolder, outputFileName),
    JSON.stringify({ icon: manifest }),
    "utf-8",
  );
}
