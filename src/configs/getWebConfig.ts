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

import { Platform } from "style-dictionary/types/Platform";
import { Theme } from "../@types";
import { File } from "style-dictionary/types/File";
import _ from "lodash";

const COMPOUND_TOKENS_NAMESPACE = "cpd";

const basePxFontSize = 16;

export default function (target: "js" | "css" | "ts", theme: Theme): Platform {
  const transforms = [
    "ts/resolveMath",
    "ts/size/px",
    "ts/size/letterspacing",
    "ts/color/hexrgba",
    "ts/typography/css/shorthand",
    "ts/shadow/shorthand",
    "attribute/cti",
    "css/pxToRem",
    "css/percentageToUnitless",
    target === "css" ? "name/cti/kebab" : "camelCaseDecimal",
  ];

  if (target === "css") {
    transforms.push("css/iconsImport");
  }

  return {
    prefix: COMPOUND_TOKENS_NAMESPACE,
    transforms,
    buildPath: `assets/web/${target === "css" ? "css" : "js"}/`,
    files: getFilesFormat(theme, target),
  };
}

const options = {
  showFileHeader: false,
  outputReferences: true,
  basePxFontSize,
};

function getFilesFormat(theme: Theme, target: "css" | "js" | "ts"): File[] {
  if (target === "ts") {
    return [
      {
        destination: `${_.camelCase(
          COMPOUND_TOKENS_NAMESPACE + "." + theme
        )}.d.ts`,
        format: "typescript/es6-declarations",
        options,
      },
    ];
  } else if (target === "js") {
    return [
      {
        destination: `${_.camelCase(
          COMPOUND_TOKENS_NAMESPACE + "." + theme
        )}.js`,
        format: "javascript/es6",
        options,
      },
    ];
  } else {
    return [
      {
        destination: `${COMPOUND_TOKENS_NAMESPACE}-common.css`,
        format: "css/variables",
        filter: "isNotCoreColor",
        options: {
          showFileHeader: false,
          outputReferences: true,
          basePxFontSize,
          selector: `:root, [class*="cpd-theme-"]`,
        },
      },
      // Generates the theme under a scoped selector
      // e.g. .cpd-dark-hc { /* ... */ }
      {
        destination: `${COMPOUND_TOKENS_NAMESPACE}-${theme}.css`,
        format: "css/variables",
        filter: "isCoreColor",
        options: {
          showFileHeader: false,
          outputReferences: true,
          selector: `.${COMPOUND_TOKENS_NAMESPACE}-theme-${theme}`,
          basePxFontSize,
        },
      },
      // Generates the theme under the :root
      // This file is to be imported with a media query import
      {
        destination: `${COMPOUND_TOKENS_NAMESPACE}-${theme}-mq.css`,
        format: "css/variables",
        filter: "isCoreColor",
        options: {
          showFileHeader: false,
          outputReferences: true,
          basePxFontSize,
        },
      },
    ];
  }
}
