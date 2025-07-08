/*
Copyright 2024 New Vector Ltd.
Copyright 2023 The Matrix.org Foundation C.I.C.

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
 */

import { register } from "@tokens-studio/sd-transforms";
import StyleDictionary from "style-dictionary";

import type { Platform, Theme } from "./@types";
import colorset from "./actions/swift/colorset";
import {
  getStyleDictionaryCommonConfig,
  getStyleDictionaryConfig,
} from "./configs";
import iosExclude from "./filters/ios/exclude";
import { isCoreColor, isNotCoreColor } from "./filters/isCoreColor";
import { isSharedAcrossTheme } from "./filters/isSharedAcrossTheme";
import camelCaseDecimal from "./transforms/camelCaseDecimal";
import iconsImport from "./transforms/css/iconsImport";
import percentageToUnitless from "./transforms/css/percentageToUnitless";
import px from "./transforms/css/px";
import fontWeight from "./transforms/kotlin/fontWeight";
import literal from "./transforms/kotlin/literal";
import percentageToEm from "./transforms/kotlin/percentageToEm";
import pxToDp from "./transforms/kotlin/pxToDp";
import pxToSp from "./transforms/kotlin/pxToSp";
import svgToDrawable from "./transforms/kotlin/svgToDrawable";
import typography from "./transforms/kotlin/typography";
import pxToRem from "./transforms/pxToRem";
import { coreColorAsset, coreUIColorAsset } from "./transforms/swift/colorAsset";
import literalFont from "./transforms/swift/literalFont.js";
import pxToCGFloat from "./transforms/swift/pxToCGFloat";
import svgToImageView from "./transforms/swift/svgToImageView";
import toFontWeight from "./transforms/swift/toFontWeight";
import tokenTICamel from "./transforms/swift/tokenTICamel";

async function setupDictionary(sb: StyleDictionary) {
  await register(StyleDictionary);
  sb.registerTransform(camelCaseDecimal);
  sb.registerTransform(literalFont);
  sb.registerTransform(pxToCGFloat);
  sb.registerTransform(toFontWeight);
  sb.registerTransform(coreColorAsset);
  sb.registerTransform(coreUIColorAsset);
  sb.registerTransform(tokenTICamel);
  sb.registerTransform(svgToImageView);

  sb.registerAction(colorset);
  sb.registerTransform(svgToDrawable);

  sb.registerTransform(fontWeight);
  sb.registerTransform(literal);
  sb.registerTransform(pxToDp);
  sb.registerTransform(pxToSp);
  sb.registerTransform(percentageToEm);
  sb.registerTransform(typography);
  sb.registerTransform(pxToRem);
  sb.registerTransform(percentageToUnitless);
  sb.registerTransform(iconsImport);
  sb.registerTransform(px);

  sb.registerFilter(iosExclude);
  sb.registerFilter(isCoreColor);
  sb.registerFilter(isNotCoreColor);
  sb.registerFilter(isSharedAcrossTheme);
}

export async function themed(theme: Theme, platform: Platform) {
  const sb = new StyleDictionary(
    await getStyleDictionaryConfig(theme, platform),
  );
  await setupDictionary(sb);
  return sb;
}

export async function common(platform: Platform) {
  const sb = new StyleDictionary(
    await getStyleDictionaryCommonConfig(platform),
  );
  await setupDictionary(sb);
  return sb;
}
