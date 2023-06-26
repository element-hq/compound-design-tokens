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
import { TransformedToken } from "style-dictionary/types";
import { Theme } from "../@types";
import { isCoreColor, isNotCoreColor } from "../filters/isCoreColor";
import _ from "lodash";
import isTypographyToken from "../filters/isTypographyToken";
import { FormatterArguments } from "style-dictionary/types/Format";
import lodashTemplate from "../utils/lodashTemplate";

const packageName = "io.element.android.libraries.theme.compound.generated";

function composeInternalObject(args: FormatterArguments) {
  return lodashTemplate("../formats/templates/compose/internal-object.kt.template", args);
}

function composeExtraColors(args: FormatterArguments) {
  return lodashTemplate("../formats/templates/compose/extra-colors.kt.template", args);
}

export function getAndroidConfig(theme: Theme): Platform {
  StyleDictionary.registerFormat({name: 'compose/internal-object', formatter: composeInternalObject});
  StyleDictionary.registerFormat({name: 'compose/extra-colors', formatter: composeExtraColors});
  return {
    transforms: [
      "camelCaseDecimal",
      "ts/resolveMath",
      "attribute/cti",
      "color/composeColor",
      "kotlin/pxToDp",
      "kotlin/svgToDrawable",
    ],
    buildPath: `assets/android/`,
    files: [
      {
        format: "compose/internal-object",
        destination: `internal/${_.upperFirst(_.camelCase(theme))}DesignTokens.kt`,
        className: _.upperFirst(_.camelCase(theme)) + "DesignTokens",
        packageName: packageName + ".internal",
        filter: function(token: TransformedToken) {
          return isCoreColor.matcher(token);
        },
        options: {
          showFileHeader: true,
          outputReferences: true,
          import: [
            "androidx.compose.ui.graphics.Color",
          ],
          isInternal: true
        },
      },
      // If we find a way to describe semantic colors, it might be possible to move this to 'common'
      {
        format: "compose/extra-colors",
        destination: `SemanticColors.kt`,
        className: "SemanticColors",
        packageName: packageName,
        filter: function(token: TransformedToken) {
          return token.type == 'color' && isNotCoreColor.matcher(token);
        },
        options: {
          showFileHeader: true,
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
      "kotlin/fontWeight",
      "kotlin/literal",
      "kotlin/typography/shorthand",
      "kotlin/pxToSp",
      "kotlin/percentageToEm",
    ],
    buildPath: `assets/android/`,
    files: [
      {
        format: 'compose/internal-object',
        destination: `TypographyTokens.kt`,
        className: "TypographyTokens",
        packageName: packageName,
        filter: isTypographyToken.matcher,
        options: {
          showFileHeader: true,
          outputReferences: false,
          import: [
            "androidx.compose.ui.text.font.FontFamily",
            "androidx.compose.ui.text.font.FontWeight",
            "androidx.compose.ui.text.TextStyle",
            "androidx.compose.ui.unit.em",
            "androidx.compose.ui.unit.sp"
          ],
        },
      },
    ],
  };
}
