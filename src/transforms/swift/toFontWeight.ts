/*
Copyright 2024 New Vector Ltd.
Copyright 2023 The Matrix.org Foundation C.I.C.

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import type { Transform, TransformedToken } from "style-dictionary/types";

/**
 * A transformer to weight values to UIKit `Font.Weight`
 * https://developer.apple.com/documentation/swiftui/font/weight
 */
export default {
  name: "swift/toFontWeight",
  type: "value",
  filter: (token: TransformedToken) => {
    const attrs = token.attributes ?? {};
    return attrs.category === "font" && attrs.type === "weight";
  },
  transform: (token: TransformedToken): string => {
    switch (token.value) {
      case "700":
        return "Font.Weight.bold";
      case "600":
        return "Font.Weight.semibold";
      default:
        return "Font.Weight.regular";
    }
  },
} as Transform;
