/*
Copyright 2024 New Vector Ltd.
Copyright 2023 The Matrix.org Foundation C.I.C.

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import { camelCase } from "lodash-es";
import StyleDictionary from "style-dictionary";
import type { File, PlatformConfig } from "style-dictionary/types";
import type { Theme } from "../@types";
import { isCoreColor } from "../filters/isCoreColor";
import isCoreToken from "../filters/isCoreToken";
import { isSharedAcrossTheme } from "../filters/isSharedAcrossTheme";
import {
  COMPOUND_TOKENS_NAMESPACE,
  cssFileName,
  type Tier,
} from "../utils/cssFileName";
import { fontFaces, fontFamilyOverrides } from "../utils/fontFallbacks";

const basePxFontSize = 16;

StyleDictionary.registerFormat({
  name: "css/fontFallbacks",
  format: () => fontFaces,
});

StyleDictionary.registerTransform({
  name: "css/fontFallbacks",
  type: "value",
  filter: (token) => token.type === "fontFamilies",
  transform: (token) => fontFamilyOverrides[token.value] ?? token.value,
});

export default function (
  target: "js" | "css" | "ts",
  theme: Theme,
): PlatformConfig {
  const transforms = [
    "ts/resolveMath",
    "css/px",
    "ts/size/css/letterspacing",
    "ts/color/css/hexrgba",
    "typography/css/shorthand",
    "shadow/css/shorthand",
    "attribute/cti",
    "css/pxToRem",
    "css/percentageToUnitless",
    "css/fontFallbacks",
    target === "css" ? "name/kebab" : "camelCaseDecimal",
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
        destination: `${camelCase(
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
        destination: `${camelCase(`${COMPOUND_TOKENS_NAMESPACE}.${theme}`)}.js`,
        format: "javascript/es6",
        options,
      },
    ];
  }
  const common = (tier: Tier): File => ({
    destination: cssFileName(null, tier, false),
    format: "css/variables",
    filter: (t) =>
      isSharedAcrossTheme.filter(t) &&
      isCoreToken.filter(t) === (tier === "base"),
    options: {
      showFileHeader: false,
      // Workaround for https://github.com/tokens-studio/sd-transforms/issues/203.
      // ts/resolveMath currently has no way to insert calc() around
      // var(...) * num expressions, so we instead force it to avoid outputting
      // the var() reference and resolve the expression to a static value.
      outputReferences: (token) =>
        typeof token.original.value !== "string" ||
        !token.original.value.includes("{space.scale} * "),
      basePxFontSize,
      selector: `:root, [class*="cpd-theme-"]`,
    },
  });

  const themed = (tier: Tier, mq: boolean): File => ({
    destination: cssFileName(theme, tier, mq),
    format: "css/variables",
    filter: (t) =>
      isCoreColor.filter(t) && isCoreToken.filter(t) === (tier === "base"),
    options: {
      showFileHeader: false,
      outputReferences: true,
      selector: mq
        ? undefined
        : `.${COMPOUND_TOKENS_NAMESPACE}-theme-${theme}.${COMPOUND_TOKENS_NAMESPACE}-theme-${theme}`,
      basePxFontSize,
    },
  });

  const fontFaces = {
    destination: `${COMPOUND_TOKENS_NAMESPACE}-font-fallbacks.css`,
    format: "css/fontFallbacks",
  };

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
    fontFaces,
  ];
}
