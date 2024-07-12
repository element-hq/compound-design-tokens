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
 * A transformer to font weight for Material 3
 */
export default {
  name: "kotlin/fontWeight",
  type: "value",
  filter: (token: TransformedToken): boolean => {
    const attrs = token.attributes ?? {};
    return attrs.category === "font" && attrs.type === "weight";
  },
  transform: (token: TransformedToken): string => {
    // See https://developer.android.com/reference/kotlin/androidx/compose/ui/text/font/FontWeight
    return `FontWeight.W${token.value}`;
  },
} satisfies Transform;
