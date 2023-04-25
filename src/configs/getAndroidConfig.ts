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
import { TransformedToken } from "style-dictionary/types";
import { Theme } from "../@types";
import { isCoreColor, isNotCoreColor } from "../filters/isCoreColor";
import isFontToken from "../filters/isFontToken";
import _ from "lodash";

const packageName = "io.element.android.compound";

export function getAndroidConfig(theme: Theme): Platform {
  return {
    transforms: [
      "camelCaseDecimal",
      "ts/resolveMath",
      "attribute/cti",
      "color/composeColor",
      "kotlin/fontWeight",
      "kotlin/literal",
      "kotlin/typography/shorthand",
      "kotlin/pxToDp",
      "kotlin/pxToSp",
      "kotlin/percentageToEm",
      "kotlin/svgToDrawable",
    ],
    buildPath: `assets/android/`,
    files: [
      {
        format: "compose/object",
        destination: `${_.upperFirst(_.camelCase(theme))}DesignTokens.kt`,
        className: _.upperFirst(_.camelCase(theme)) + "DesignTokens",
        packageName: packageName,
        filter: function(token: TransformedToken) {
          return isCoreColor.matcher(token);
        },
        options: {
          showFileHeader: false,
          outputReferences: true,
          import: [
            "androidx.compose.ui.graphics.Color",
            "androidx.compose.ui.unit.*",
            "androidx.compose.ui.text.*",
          ],
        },
      },
      // If we find a way to describe semantic colors, it might be possible to move this to 'common'
      {
        format: "compose/extra-colors",
        destination: `CompoundColors.kt`,
        className: "CompoundColors",
        packageName: packageName,
        filter: function(token: TransformedToken) {
          return token.type == 'color' && isNotCoreColor.matcher(token);
        },
        options: {
          showFileHeader: false,
          import: [],
        },
      },
    ],
  };
}

export function getCommonAndroidConfig(): Platform {
  return {
    transforms: [
      "camelCaseDecimal",
      "ts/resolveMath",
      "attribute/cti",
      "color/composeColor",
      "kotlin/fontWeight",
      "kotlin/literal",
      "kotlin/typography/shorthand",
      "kotlin/pxToDp",
      "kotlin/pxToSp",
      "kotlin/percentageToEm",
      "kotlin/svgToDrawable",
    ],
    buildPath: `assets/android/`,
    files: [
      {
        format: "compose/object",
        destination: `CompoundTypography.kt`,
        className: "CompoundTypography",
        packageName: packageName,
        filter: isFontToken,
        options: {
          showFileHeader: false,
          outputReferences: true,
          import: [
            "androidx.compose.ui.text.font.FontFamily",
            "androidx.compose.ui.text.font.FontWeight",
            "androidx.compose.ui.text.TextStyle",
            "androidx.compose.ui.unit.em",
            "androidx.compose.ui.unit.sp",
          ],
        },
      },
    ],
  };
}
