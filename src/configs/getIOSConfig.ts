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

import StyleDictionary from "style-dictionary";
import { Platform } from "style-dictionary/types/Platform";
import { Theme } from "../@types";
import { TransformedToken } from "style-dictionary/types";
import { FormatterArguments } from "style-dictionary/types/Format";
import createTemplate from "../utils/createTemplate";
import iosExclude from "../filters/ios/exclude";
import _ from "lodash";

function swiftClassMembers(args: FormatterArguments) {
  return createTemplate(
    "../formats/templates/swift/class-members.template",
    args
  )
}

/* 
 * Config that builds colorsets and creates SwiftUI Colors.
 */
export function getIOSColorConfig(theme: Theme): Platform {
  return {
    transforms: [
      "attribute/cti",
      "camelCaseDecimal",
      "attribute/color",
      "swift/coreColorSet",
      "ts/resolveMath",
    ],
    options: {
      theme,
    },
    actions: ["ios/colorset"],
    buildPath: `assets/ios/swift/`,
    files: [
      {
        filter: function(token: TransformedToken) {
          return token.type == 'color' && iosExclude.matcher(token);
        },
        destination: "CompoundColorTokens.swift",
        format: "ios-swift/class.swift",
        options: {
          showFileHeader: false,
          outputReferences: true,
          import: "SwiftUI",
        },
        className: "CompoundColorTokens",
      },
    ]
  }
}

/* 
 * Config that creates UIKit Colors.
 */
export function getIOSUIColorConfig(theme: Theme): Platform {
  return {
    transforms: [
      "attribute/cti",
      "camelCaseDecimal",
      "attribute/color",
      "swift/coreUIColorSet",
      "ts/resolveMath",
    ],
    options: {
      theme,
    },
    buildPath: `assets/ios/swift/`,
    files: [
      {
        filter: function(token: TransformedToken) {
          return token.type == 'color' && iosExclude.matcher(token);
        },
        destination: "CompoundUIColorTokens.swift",
        format: "ios-swift/class.swift",
        options: {
          showFileHeader: false,
          outputReferences: true,
          import: "UIKit",
        },
        className: "CompoundUIColorTokens",
      },
    ]
  }
}

/* 
 * Config that creates the remaining iOS tokens.
 */
export function getCommonIOSConfig(): Platform {
  StyleDictionary.registerFormat({
    name: "swift/class-members",
    formatter: swiftClassMembers,
  });
  return {
    transforms: [
      "attribute/cti",
      "camelCaseDecimal",
      "font/swift/literal",
      "swift/icon/ti",
      "swift/pxToCGFloat",
      "swift/toFontWeight",
      "swift/svgToImageView",
      "ts/resolveMath",
    ],
    buildPath: `assets/ios/swift/`,
    files: [
      {
        filter: function(token: TransformedToken) {
          return token.type == 'icon' && iosExclude.matcher(token);
        },
        destination: "CompoundIcons.swift",
        format: "swift/class-members",
        options: {
          showFileHeader: false,
          outputReferences: true,
          import: ["SwiftUI"],
          objectType: "class",
          accessControl: "public",
        },
        className: "CompoundIcons",
      },
      {
        filter: function(token: TransformedToken) {
          return token.type != 'color' && token.type != 'icon' && iosExclude.matcher(token);
        },
        destination: "CompoundDesignTokens.swift",
        format: "ios-swift/class.swift",
        options: {
          showFileHeader: false,
          outputReferences: true,
          import: "SwiftUI",
        },
        className: "CompoundDesignTokens",
      },
    ],
  };
}
