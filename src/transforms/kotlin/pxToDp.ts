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

import type { TransformedToken } from "style-dictionary/types/TransformedToken";

/**
 * A transformer to change `px` to `dp`
 */
export default {
  type: "value",
  transitive: true,
  matcher: (token: TransformedToken): boolean => {
    const attrs = token.attributes ?? {};
    return (
      (attrs.category === "border" && attrs.type === "width") ||
      attrs.category === "space"
    );
  },
  transformer: (token: TransformedToken): string => {
    const [val, multiplier] = token.value.split("*");

    let transformedValue = !val.includes(".dp")
      ? val.trim().replace("px", "") + ".dp"
      : val.trim();

    /**
     * In Kotlin, 1 can be used to multiply a Float, but 0.5 can't
     * (it's recognised as a Double instead). To make these multipliers work with
     * any number, instead of * 0.5 or * 2, it should be * 0.5f and * 2f
     */
    if (multiplier) {
      transformedValue += ` * ${multiplier.trim()}f`;
    }

    return transformedValue;
  },
};
