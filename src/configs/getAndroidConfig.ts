/*
Copyright 2024 New Vector Ltd.
Copyright 2023 The Matrix.org Foundation C.I.C.

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import { camelCase, upperFirst } from "lodash-es";
import StyleDictionary from "style-dictionary";
import type {
  FormatFnArguments,
  LocalOptions,
  PlatformConfig,
  TransformedToken,
} from "style-dictionary/types";
import type { Theme } from "../@types";
import isCoreToken from "../filters/isCoreToken";
import isTypographyToken from "../filters/isTypographyToken";
import { ANDROID_INDENT_LEVEL } from "../utils/constants";
import createTemplate from "../utils/createTemplate";
import { removePrefixAndCamelCase } from "../utils/removePrefixAndCamelCase";

const packageName = "io.element.android.compound.tokens.generated";
const packageNameR = "io.element.android.compound.R";
const buildPath = "assets/android/src/";

function composeAndroidLicense() {
  return createTemplate(
    "../formats/templates/compose/android-license.kt.template",
    null,
  );
}

function composeInternalObject(args: FormatFnArguments) {
  return createTemplate(
    "../formats/templates/compose/internal-object.kt.template",
    args,
  );
}

function composeExtraColors(args: FormatFnArguments) {
  return createTemplate(
    "../formats/templates/compose/extra-colors.kt.template",
    args,
  );
}

function composeCoreColors(args: FormatFnArguments) {
  return createTemplate(
    "../formats/templates/compose/core-colors.kt.template",
    args,
  );
}

function composeSemanticColors(args: FormatFnArguments) {
  return createTemplate(
    "../formats/templates/compose/semantic-colors.kt.template",
    args,
  );
}

function composeIcons(args: FormatFnArguments) {
  return createTemplate("../formats/templates/compose/icons.kt.template", args);
}

const defaultOptions: LocalOptions = {
  showFileHeader: true,
  fileHeader: () => [
    "!!! WARNING !!!",
    "",
    "THIS IS AN AUTOGENERATED FILE.",
    "DO NOT EDIT MANUALLY.",
  ],
  license: await composeAndroidLicense(),
  indentLevel: ANDROID_INDENT_LEVEL,
  isInternal: false,
};

function withDefaultOptions(options: LocalOptions): LocalOptions {
  const mergedOptions: LocalOptions = { ...defaultOptions };
  for (const key in options) {
    mergedOptions[key] = options[key];
  }
  return mergedOptions;
}

function fixColorName(colorName: string): string {
  return removePrefixAndCamelCase(colorName, "color");
}

function getIconName(iconName: string): string {
  const camelCaseName = removePrefixAndCamelCase(iconName, "icon");
  return camelCaseName.charAt(0).toUpperCase() + camelCaseName.slice(1);
}

export function getAndroidConfig(theme: Theme): PlatformConfig {
  StyleDictionary.registerFormat({
    name: "compose/internal-object",
    format: composeInternalObject,
  });
  StyleDictionary.registerFormat({
    name: "compose/extra-colors",
    format: composeExtraColors,
  });
  StyleDictionary.registerFormat({
    name: "compose/core-colors",
    format: composeCoreColors,
  });
  StyleDictionary.registerFormat({
    name: "compose/semantic-colors",
    format: composeSemanticColors,
  });
  StyleDictionary.registerFormat({
    name: "compose/icons",
    format: composeIcons,
  });
  const className = upperFirst(camelCase(theme));
  let valName = "";
  let themeName = "";
  let tokenClassName = "";
  switch (className) {
    case "Light": {
      valName = "compoundColorsLight";
      themeName = "light";
      tokenClassName = "LightColorTokens";
      break;
    }
    case "LightHc": {
      valName = "compoundColorsHcLight";
      themeName = "high contrast light";
      tokenClassName = "LightHcColorTokens";
      break;
    }
    case "Dark": {
      valName = "compoundColorsDark";
      themeName = "dark";
      tokenClassName = "DarkColorTokens";
      break;
    }
    case "DarkHc": {
      valName = "compoundColorsHcDark";
      themeName = "high contrast dark";
      tokenClassName = "DarkHcColorTokens";
      break;
    }
    default: {
      valName = "Error";
      themeName = "Error";
      tokenClassName = "Error";
      break;
    }
  }
  return {
    transforms: [
      "camelCaseDecimal",
      "ts/resolveMath",
      "attribute/cti",
      "color/composeColor",
      "kotlin/pxToDp",
      "kotlin/svgToDrawable",
    ],
    buildPath,
    files: [
      {
        format: "compose/core-colors",
        destination: `internal/${className}ColorTokens.kt`,
        filter: (token: TransformedToken) =>
          token.type === "color" && isCoreToken.filter(token),
        options: withDefaultOptions({
          outputReferences: false,
          import: ["androidx.compose.ui.graphics.Color"],
          isInternal: true,
          className: `${className}ColorTokens`,
          packageName: `${packageName}.internal`,
        }),
      },
      {
        format: "compose/semantic-colors",
        destination: `SemanticColors${className}.kt`,
        filter: (token: TransformedToken) =>
          token.type === "color" && !isCoreToken.filter(token),
        options: withDefaultOptions({
          outputReferences: true,
          import: [
            "io.element.android.compound.annotations.CoreColorToken",
            `io.element.android.compound.tokens.generated.internal.${tokenClassName}`,
          ],
          isInternal: true,
          valName: valName,
          themeName: themeName,
          tokenClassName: tokenClassName,
          isLight: className.startsWith("Light"),
          className: `${className}ColorTokens`,
          packageName: packageName,
        }),
      },
      // If we find a way to describe semantic colors, it might be possible to move this to 'common'
      {
        format: "compose/extra-colors",
        destination: "SemanticColors.kt",
        filter: (token: TransformedToken) =>
          token.type === "color" && !isCoreToken.filter(token),
        options: withDefaultOptions({
          outputReferences: true,
          import: [],
          fixColorName,
          className: "SemanticColors",
          packageName: packageName,
        }),
      },
      {
        format: "compose/icons",
        destination: "CompoundIcons.kt",
        filter: (token: TransformedToken) => token.type === "icon",
        options: withDefaultOptions({
          outputReferences: true,
          import: [
            packageNameR,
            "androidx.compose.runtime.Composable",
            "androidx.compose.ui.graphics.vector.ImageVector",
            "androidx.compose.ui.res.vectorResource",
            "kotlinx.collections.immutable.persistentListOf",
          ],
          getIconName,
          className: "CompoundIcons",
          packageName,
        }),
      },
    ],
  };
}

export function getCommonAndroidConfig(): PlatformConfig {
  return {
    transforms: [
      "camelCaseDecimal",
      "attribute/cti",
      "kotlin/fontWeight",
      "kotlin/literal",
      "kotlin/typography/shorthand",
      "kotlin/pxToSp",
      "kotlin/percentageToEm",
    ],
    buildPath,
    files: [
      {
        format: "compose/internal-object",
        destination: "TypographyTokens.kt",
        filter: isTypographyToken.filter,
        options: withDefaultOptions({
          outputReferences: false,
          import: [
            "androidx.compose.ui.text.font.FontFamily",
            "androidx.compose.ui.text.font.FontWeight",
            "androidx.compose.ui.text.TextStyle",
            "androidx.compose.ui.unit.em",
            "androidx.compose.ui.unit.sp",
            "androidx.compose.ui.text.PlatformTextStyle",
            "androidx.compose.ui.text.style.LineHeightStyle",
          ],
          className: "TypographyTokens",
          packageName,
        }),
      },
    ],
  };
}
