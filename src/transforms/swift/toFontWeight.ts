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
