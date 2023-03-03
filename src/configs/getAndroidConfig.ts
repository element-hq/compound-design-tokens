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

export default function getAndroidConfig(theme: Theme): Platform {
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
        packageName: "io.element.android.compound",
        options: {
          showFileHeader: false,
          import: [
            "androidx.compose.ui.graphics.Color",
            "androidx.compose.ui.unit.*",
            "androidx.compose.ui.text.*",
          ],
        },
      },
    ],
  };
}
