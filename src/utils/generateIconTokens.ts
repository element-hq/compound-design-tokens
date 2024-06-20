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
 * Generates `icons/$icons.json` and React components off all the
 * SVG icons discovered in the `icons/` folder
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
  const indexEsmStatements = [];
  // The 'module.exports' object for the index.cjs file
  const indexCjsExportsProperties = [];

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
    const esm = await svgrTransform(
      svg,
      {
        plugins: [svgrPluginJsx as unknown as ConfigPlugin],
        icon: true,
        jsxRuntime: "automatic",
        jsx: {
          babelConfig: {
            plugins: [
              {
                // This patches the sourceType so that the JSX transform emits ESM code
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

        template(variables, { tpl }) {
          return tpl`
          function ${variables.componentName}(${variables.props}) {
            return (
              ${variables.jsx}
            );
          };
          ${variables.componentName}.displayName = '${variables.componentName}'

          export default ${variables.componentName};
        `;
        },
      },
      {
        componentName,
      },
    );

    const cjs = await svgrTransform(
      svg,
      {
        plugins: [svgrPluginJsx as unknown as ConfigPlugin],
        icon: true,
        jsxRuntime: "automatic",
        jsx: {
          babelConfig: {
            plugins: [[babelTransformReactJsx, { runtime: "automatic" }]],
          } satisfies BabelOptions,
        },

        template(variables, { tpl }) {
          return tpl`
          function ${variables.componentName}(${variables.props}) {
            return (
              ${variables.jsx}
            );
          };
          ${variables.componentName}.displayName = '${variables.componentName}'

          module.exports = ${variables.componentName};
        `;
        },
      },
      {
        componentName,
      },
    );

    // Write the react component to the web output folder, both in cjs and esm format
    await fs.writeFile(
      path.join(webOutput, `${parsedPath.name}.js`),
      esm,
      "utf-8",
    );
    await fs.writeFile(
      path.join(webOutput, `${parsedPath.name}.cjs`),
      cjs,
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
    indexEsmStatements.push(
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

    // Add the component to the module.exports object for the index.cjs
    //   SomeIcon: require("./some-icon.cjs"),
    indexCjsExportsProperties.push(
      t.objectProperty(
        t.identifier(componentName),
        t.callExpression(t.identifier("require"), [
          t.stringLiteral(`./${parsedPath.name}.cjs`),
        ]),
      ),
    );
  }

  // Craft a program for the index.cjs file
  //   module.exports = { ... };
  const cjsProgram = t.program([
    t.expressionStatement(
      t.assignmentExpression(
        "=",
        t.memberExpression(t.identifier("module"), t.identifier("exports")),
        t.objectExpression(indexCjsExportsProperties),
      ),
    ),
  ]);

  // Generate the index.cjs file
  const cjsCode = generate.default(cjsProgram).code;
  await fs.writeFile(path.join(webOutput, "index.cjs"), cjsCode, "utf-8");

  // Generate the index.js file
  const esmProgram = t.program(indexEsmStatements, [], "module");
  const esmCode = generate.default(esmProgram).code;
  await fs.writeFile(path.join(webOutput, "index.js"), esmCode, "utf-8");

  // The index.d.ts is identical to the index.js as it only re-exports the icons
  await fs.writeFile(path.join(webOutput, "index.d.ts"), esmCode, "utf-8");

  // Write the icons manifest to the icons folder
  await fs.writeFile(
    path.join(iconsFolder, outputFileName),
    JSON.stringify({ icon: manifest }),
    "utf-8",
  );
}
