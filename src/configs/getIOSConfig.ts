/*
Copyright 2024 New Vector Ltd.
Copyright 2023 The Matrix.org Foundation C.I.C.

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import StyleDictionary from "style-dictionary";
import type {
  FormatFnArguments,
  PlatformConfig,
  TransformedToken,
} from "style-dictionary/types";
import type { Theme } from "../@types";
import iosExclude from "../filters/ios/exclude";
import { isCoreColor } from "../filters/isCoreColor";
import isCoreToken from "../filters/isCoreToken";
import { isCssGradient } from "../filters/isCssGradient";
import createTemplate from "../utils/createTemplate";
import { colorAssetInit, uiColorAssetInit } from "../transforms/swift/colorAsset";

const coreColorClass = "CompoundCoreColorTokens";
const coreUIColorClass = "CompoundCoreUIColorTokens";

function swiftClassMembers(args: FormatFnArguments) {
  return createTemplate(
    "../formats/templates/swift/class-members.template",
    args,
  );
}

/*
 * Post-processes semantic colors so that asymmetric colors are loaded from their
 * colorset asset and symmetric colors reference the core color class.
 */
function postProcessSemanticColorToken(token: TransformedToken, formatted: string, isSwiftUIColor: boolean): string {
  let components = formatted.split(' = ');

  if (isCoreColor.filter(token)) { // If a semantic token is a core color, it is an asymmetric color.
    let init = isSwiftUIColor ? colorAssetInit : uiColorAssetInit
    return `${components[0]} = ${init(components[0])}`;
  } else { // Otherwise, it is a symmetric color (and we need to access the reference on the core color class).
    let referenceClass = isSwiftUIColor ? coreColorClass : coreUIColorClass
    return `${components[0]} = ${referenceClass}.${components[1]}`;
  }
}

/*
 * Config that builds colorsets and creates SwiftUI Colors.
 */
export function getIOSColorConfig(theme: Theme): PlatformConfig {
  StyleDictionary.registerFormat({
    name: "swift/class-members",
    format: swiftClassMembers,
  });
  return {
    transforms: [
      "attribute/cti",
      "camelCaseDecimal",
      "attribute/color",
      "swift/token/ti",
      "swift/coreColorAsset",
      "ts/resolveMath",
    ],
    options: {
      theme,
    },
    actions: ["ios/colorset"],
    buildPath: "assets/ios/swift/",
    files: [
      {
        filter: (token: TransformedToken) =>
          token.type === "color" &&
          isCoreToken.filter(token) &&
          !isCssGradient.filter(token),
        destination: `${coreColorClass}.swift`,
        format: "ios-swift/class.swift",
        options: {
          showFileHeader: false,
          outputReferences: true,
          import: "SwiftUI",
          className: coreColorClass,
        },
      },
      {
        filter: (token: TransformedToken) =>
          token.type === "color" &&
          !isCoreToken.filter(token) &&
          !isCssGradient.filter(token),
        destination: "CompoundColorTokens.swift",
        format: "swift/class-members",
        options: {
          showFileHeader: false,
          outputReferences: true,
          import: ["SwiftUI"],
          objectType: "class",
          accessControl: "public",
          className: "CompoundColorTokens",
          postProcessSemanticColorToken,
        },
      },
    ],
  };
}

/*
 * Config that creates UIKit Colors.
 */
export function getIOSUIColorConfig(theme: Theme): PlatformConfig {
  StyleDictionary.registerFormat({
    name: "swift/class-members",
    format: swiftClassMembers,
  });
  return {
    transforms: [
      "attribute/cti",
      "camelCaseDecimal",
      "attribute/color",
      "swift/token/ti",
      "swift/coreUIColorAsset",
      "ts/resolveMath",
    ],
    options: {
      theme,
    },
    buildPath: "assets/ios/swift/",
    files: [
      {
        filter: (token: TransformedToken) =>
          token.type === "color" &&
          isCoreToken.filter(token) &&
          !isCssGradient.filter(token),
        destination: `${coreUIColorClass}.swift`,
        format: "ios-swift/class.swift",
        options: {
          showFileHeader: false,
          outputReferences: true,
          import: "UIKit",
          className: coreUIColorClass,
        },
      },
      {
        filter: (token: TransformedToken) =>
          token.type === "color" &&
          !isCoreToken.filter(token) &&
          !isCssGradient.filter(token),
        destination: "CompoundUIColorTokens.swift",
        format: "swift/class-members",
        options: {
          showFileHeader: false,
          outputReferences: true,
          import: ["UIKit"],
          objectType: "class",
          accessControl: "public",
          className: "CompoundUIColorTokens",
          postProcessSemanticColorToken,
        },
      },
    ],
  };
}

/*
 * Config that creates the remaining iOS tokens.
 */
export function getCommonIOSConfig(): PlatformConfig {
  StyleDictionary.registerFormat({
    name: "swift/class-members",
    format: swiftClassMembers,
  });
  return {
    transforms: [
      "attribute/cti",
      "camelCaseDecimal",
      "swift/literalFont",
      "swift/token/ti",
      "swift/pxToCGFloat",
      "swift/toFontWeight",
      "swift/svgToImageView",
      "ts/resolveMath",
    ],
    buildPath: "assets/ios/swift/",
    files: [
      {
        filter: (token: TransformedToken) => token.type === "icon",
        destination: "CompoundIcons.swift",
        format: "swift/class-members",
        options: {
          showFileHeader: false,
          outputReferences: true,
          import: ["SwiftUI"],
          objectType: "class",
          accessControl: "public",
          className: "CompoundIcons",
        },
      },
      {
        filter: (token: TransformedToken) =>
          token.type !== "color" &&
          token.type !== "icon" &&
          iosExclude.filter(token),
        destination: "CompoundDesignTokens.swift",
        format: "ios-swift/class.swift",
        options: {
          showFileHeader: false,
          outputReferences: true,
          import: "SwiftUI",
          className: "CompoundDesignTokens",
        },
      },
    ],
  };
}
