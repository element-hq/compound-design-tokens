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
import { COMPOUND_TOKENS_NAMESPACE } from "./utils";
import { Theme } from "../@types";
import { File } from "style-dictionary/types/File";
import _ from "lodash";

export default function (target: "js" | "css", theme: Theme): Platform {
  if (target !== "css" && target !== "js") {
    throw `Unsupport web platform: ${target}`;
  }

  return {
    transformGroup: `tokens-${target}`,
    prefix: COMPOUND_TOKENS_NAMESPACE,
    transforms: [
      "ts/resolveMath",
      "ts/size/px",
      "ts/size/letterspacing",
      "ts/color/hexrgba",
      "ts/typography/shorthand",
      "ts/shadow/shorthand",
      "attribute/cti",
      "color/hex",
      target === "css" ? "name/cti/kebab" : "camelCaseDecimal",
    ],
    buildPath: `assets/web/${target}/`,
    files: getFilesFormat(theme, target),
  };
}

function getFilesFormat(theme: Theme, target: "css" | "js"): File[] {
  if (target === "js") {
    return [
      {
        destination: `${_.camelCase(
          COMPOUND_TOKENS_NAMESPACE + "." + theme
        )}.js`,
        format: "javascript/es6",
        options: {
          showFileHeader: false,
          outputReferences: true,
        },
      },
    ];
  } else {
    return [
      // Generates the theme under a scoped selector
      // e.g. .cpd-dark-hc { /* ... */ }
      {
        destination: `${COMPOUND_TOKENS_NAMESPACE}-${theme}.css`,
        format: "css/variables",
        options: {
          showFileHeader: false,
          outputReferences: true,
          selector: `.${COMPOUND_TOKENS_NAMESPACE}-theme-${theme}`,
        },
      },
      // Generates the theme under the :root
      // This file is to be imported with a media query import
      {
        destination: `${COMPOUND_TOKENS_NAMESPACE}-${theme}-mq.css`,
        format: "css/variables",
        options: {
          showFileHeader: false,
          outputReferences: true,
        },
      },
    ];
  }
}
