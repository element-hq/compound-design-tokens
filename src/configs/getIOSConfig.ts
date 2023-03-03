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
import _ from "lodash";

export default function getIOSConfig(theme: Theme): Platform {
  return {
    transforms: [
      "attribute/cti",
      "camelCaseDecimal",
      "attribute/color",
      "font/swift/literal",
      "swift/pxToCGFloat",
      "swift/toFontWeight",
      "swift/coreColorSet",
      "swift/svgToImageView",
      "ts/resolveMath",
    ],
    options: {
      theme,
    },
    actions: ["ios/colorset"],
    buildPath: `assets/ios/swift/`,
    files: [
      {
        filter: "ios/exclude",
        destination: `${_.upperFirst(
          _.camelCase(`Compound ${theme} DesignTokens`)
        )}.swift`,
        format: "ios-swift/class.swift",
        options: {
          showFileHeader: false,
          outputReferences: true,
          import: "SwiftUI",
        },
        className: `Compound${_.upperFirst(_.camelCase(theme))}DesignTokens`,
      },
    ],
  };
}
