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

import type StyleDictionary from "style-dictionary";
import type { TransformedToken } from "style-dictionary/types/TransformedToken";

/**
 * Excluded tokens in the iOS bundle
 */
export default {
  name: "ios/exclude",
  matcher: (token: TransformedToken): boolean => {
    const attrs = token.attributes ?? {};
    const isTypography = token.type === "typography";
    const isLetterSpacing =
      attrs.category === "font" && attrs.type === "letter-spacing";
    return !isTypography && !isLetterSpacing;
  },
} as StyleDictionary.Filter;
