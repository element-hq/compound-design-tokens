/*
Copyright (c) 2025 Element Creations Ltd.
Copyright 2024-2025 New Vector Ltd.
Copyright 2023 The Matrix.org Foundation C.I.C.

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial.
Please see LICENSE files in the repository root for full details.
*/

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import type { TransformOptions as BabelOptions } from "@babel/core";
import generate_ from "@babel/generator";
import babelTransformReactJsx from "@babel/plugin-transform-react-jsx";
import t from "@babel/types";
import { type ConfigPlugin, transform as svgrTransform } from "@svgr/core";
import svgrPluginJsx from "@svgr/plugin-jsx";
import { camelCase, startCase } from "lodash-es";

// Types for the default export of @babel/generator are wrong
const generate = (generate_ as unknown as { default: typeof generate_ })
  .default;

/**
 * Generates React components off all the icons discovered in the icons/ folder.
 */
export default async function generateIconComponents(): Promise<void> {
  const iconsFolder = fileURLToPath(new URL("../../icons/", import.meta.url));
  const webOutput = fileURLToPath(
    new URL("../../assets/web/icons/", import.meta.url),
  );

  const files = await fs.readdir(iconsFolder);

  const icons = files.filter((asset) => asset.endsWith(".svg"));

  // List of statements to be added to the assets/web/icons/index.js file
  const indexEsmStatements = [];
  // The 'module.exports' object for the index.cjs file
  const indexCjsExportsProperties = [];

  for (const icon of icons) {
    const assetPath = path.join(iconsFolder, icon);
    const parsedPath = path.parse(assetPath);
    const svg = await fs.readFile(assetPath, "utf-8");

    // Compute the component name
    // mic-on.svg -> MicOnIcon
    const componentName = `${startCase(camelCase(parsedPath.name)).replace(/\s/g, "")}Icon`;

    // This generates a React component for the icon
    const esm = await svgrTransform(
      svg,
      {
        plugins: [svgrPluginJsx as unknown as ConfigPlugin],
        icon: true,
        ref: true,
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
          import { forwardRef } from "react";

          function ${variables.componentName}(${variables.props}) {
            return (
              ${variables.jsx}
            );
          };
          ${variables.componentName}.displayName = '${variables.componentName}'

          export default forwardRef(${variables.componentName});
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
        ref: true,
        jsxRuntime: "automatic",
        jsx: {
          babelConfig: {
            plugins: [[babelTransformReactJsx, { runtime: "automatic" }]],
          } satisfies BabelOptions,
        },

        template(variables, { tpl }) {
          return tpl`
          var React = require("react");

          function ${variables.componentName}(${variables.props}) {
            return (
              ${variables.jsx}
            );
          };
          ${variables.componentName}.displayName = '${variables.componentName}'

          module.exports = React.forwardRef(${variables.componentName});
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
    const dTs = `import React from "react";

/**
 * ${parsedPath.base}
 */
declare const ${componentName}: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref" | "children"> &
    React.RefAttributes<SVGSVGElement>
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
  const cjsCode = generate(cjsProgram).code;
  await fs.writeFile(path.join(webOutput, "index.cjs"), cjsCode, "utf-8");

  // Generate the index.js file
  const esmProgram = t.program(indexEsmStatements, [], "module");
  const esmCode = generate(esmProgram).code;
  await fs.writeFile(path.join(webOutput, "index.js"), esmCode, "utf-8");

  // The index.d.ts is identical to the index.js as it only re-exports the icons
  await fs.writeFile(path.join(webOutput, "index.d.ts"), esmCode, "utf-8");
}
