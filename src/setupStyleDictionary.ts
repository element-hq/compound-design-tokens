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

import { registerTransforms } from "@tokens-studio/sd-transforms";
import * as StyleDictionary from "style-dictionary";
import { Core } from "style-dictionary";
import { Transform } from "style-dictionary/types/Transform";
import { Named } from "style-dictionary/types/_helpers";

import { Action } from "style-dictionary/types/Action";
import { Platform, Theme } from "./@types";
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
import fontWeight from "./transforms/kotlin/fontWeight";
import literal from "./transforms/kotlin/literal";
import percentageToEm from "./transforms/kotlin/percentageToEm";
import pxToDp from "./transforms/kotlin/pxToDp";
import pxToSp from "./transforms/kotlin/pxToSp";
import svgToDrawable from "./transforms/kotlin/svgToDrawable";
import typography from "./transforms/kotlin/typography";
import pxToRem from "./transforms/pxToRem";
import coreColorSet from "./transforms/swift/coreColorSet";
import coreUIColorSet from "./transforms/swift/coreUIColorSet";
import pxToCGFloat from "./transforms/swift/pxToCGFloat";
import svgToImageView from "./transforms/swift/svgToImageView";
import toFontWeight from "./transforms/swift/toFontWeight";
import tokenTICamel from "./transforms/swift/tokenTICamel";

async function setupDictionary(sb: Core) {
  await registerTransforms(sb);
  sb.registerTransform({
    name: "camelCaseDecimal",
    ...camelCaseDecimal,
  } as Named<Transform>);
  sb.registerTransform({
    name: "swift/pxToCGFloat",
    ...pxToCGFloat,
  } as Named<Transform>);
  sb.registerTransform({
    name: "swift/toFontWeight",
    ...toFontWeight,
  } as Named<Transform>);
  sb.registerTransform({
    name: "swift/coreColorSet",
    ...coreColorSet,
  } as Named<Transform>);
  sb.registerTransform({
    name: "swift/coreUIColorSet",
    ...coreUIColorSet,
  } as Named<Transform>);
  sb.registerTransform({
    name: "swift/token/ti",
    ...tokenTICamel,
  } as Named<Transform>);
  sb.registerTransform({
    name: "swift/svgToImageView",
    ...svgToImageView,
  } as Named<Transform>);

  sb.registerAction({
    name: "ios/colorset",
    ...colorset,
  } as Named<Action>);
  sb.registerTransform({
    name: "kotlin/svgToDrawable",
    ...svgToDrawable,
  } as Named<Transform>);

  sb.registerTransform({
    name: "kotlin/fontWeight",
    ...fontWeight,
  } as Named<Transform>);
  sb.registerTransform({
    name: "kotlin/literal",
    ...literal,
  } as Named<Transform>);
  sb.registerTransform({
    name: "kotlin/pxToDp",
    ...pxToDp,
  } as Named<Transform>);
  sb.registerTransform({
    name: "kotlin/pxToSp",
    ...pxToSp,
  } as Named<Transform>);
  sb.registerTransform({
    name: "kotlin/percentageToEm",
    ...percentageToEm,
  } as Named<Transform>);
  sb.registerTransform({
    name: "kotlin/typography/shorthand",
    ...typography,
  } as Named<Transform>);
  sb.registerTransform({
    name: "css/pxToRem",
    ...pxToRem,
  } as Named<Transform>);
  sb.registerTransform({
    name: "css/percentageToUnitless",
    ...percentageToUnitless,
  } as Named<Transform>);
  sb.registerTransform({
    name: "css/iconsImport",
    ...iconsImport,
  } as Named<Transform>);

  sb.registerFilter(iosExclude);
  sb.registerFilter(isCoreColor);
  sb.registerFilter(isNotCoreColor);
  sb.registerFilter(isSharedAcrossTheme);
}

export async function themed(theme: Theme, platform: Platform) {
  const sb = StyleDictionary.extend(getStyleDictionaryConfig(theme, platform));
  setupDictionary(sb);
  return sb;
}

export async function common(platform: Platform) {
  const sb = StyleDictionary.extend(getStyleDictionaryCommonConfig(platform));
  setupDictionary(sb);
  return sb;
}
