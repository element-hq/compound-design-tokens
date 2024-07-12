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

import type { Filter, TransformedToken } from "style-dictionary/types";

/** Font token types used in the project. */
const fontTokenTypes = [
  "typography",
  "fontFamilies",
  "fontWeights",
  "letterSpacing",
  "fontSizes",
  "lineHeights",
];

/**
 * Filter any token related to fonts (typography, size, spacing, etc.).
 */
export default {
  name: "isFontToken",
  filter: (token: TransformedToken): boolean =>
    token.type !== undefined && fontTokenTypes.includes(token.type),
} satisfies Filter;
