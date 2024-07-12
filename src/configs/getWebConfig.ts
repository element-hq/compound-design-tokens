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

import _ from "lodash-es";
import type { File } from "style-dictionary/types/File";
import type { Platform } from "style-dictionary/types/Platform";
import type { Theme } from "../@types";
import { isCoreColor } from "../filters/isCoreColor";
import isCoreToken from "../filters/isCoreToken";
import { isSharedAcrossTheme } from "../filters/isSharedAcrossTheme";
import {
  COMPOUND_TOKENS_NAMESPACE,
  type Tier,
  cssFileName,
} from "../utils/cssFileName";

const basePxFontSize = 16;

export default function (target: "js" | "css" | "ts", theme: Theme): Platform {
  const transforms = [
    "ts/resolveMath",
    "ts/size/px",
    "ts/size/css/letterspacing",
    "ts/color/css/hexrgba",
    "ts/typography/css/shorthand",
    "ts/shadow/css/shorthand",
    "attribute/cti",
    "css/pxToRem",
    "css/percentageToUnitless",
    target === "css" ? "name/cti/kebab" : "camelCaseDecimal",
  ];

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
          `${COMPOUND_TOKENS_NAMESPACE}.${theme}`,
        )}.d.ts`,
        format: "typescript/es6-declarations",
        options,
      },
    ];
  }
  if (target === "js") {
    return [
      {
        destination: `${_.camelCase(
          `${COMPOUND_TOKENS_NAMESPACE}.${theme}`,
        )}.js`,
        format: "javascript/es6",
        options,
      },
    ];
  }
  const common = (tier: Tier): File => ({
    destination: cssFileName(null, tier, false),
    format: "css/variables",
    filter: (t) =>
      isSharedAcrossTheme.matcher(t) &&
      isCoreToken.matcher(t) === (tier === "base"),
    options: {
      showFileHeader: false,
      outputReferences: true,
      basePxFontSize,
      selector: `:root, [class*="cpd-theme-"]`,
    },
  });

  const themed = (tier: Tier, mq: boolean): File => ({
    destination: cssFileName(theme, tier, mq),
    format: "css/variables",
    filter: (t) =>
      isCoreColor.matcher(t) && isCoreToken.matcher(t) === (tier === "base"),
    options: {
      showFileHeader: false,
      outputReferences: true,
      selector: mq
        ? undefined
        : `.${COMPOUND_TOKENS_NAMESPACE}-theme-${theme}.${COMPOUND_TOKENS_NAMESPACE}-theme-${theme}`,
      basePxFontSize,
    },
  });

  return [
    common("base"),
    common("semantic"),
    // Generates the theme under a scoped selector
    // e.g. .cpd-dark-hc { /* ... */ }
    themed("base", false),
    themed("semantic", false),
    // Generates the theme under the :root
    // This file is to be imported with a media query import
    themed("base", true),
    themed("semantic", true),
  ];
}
