/*
Copyright 2024 New Vector Ltd.
Copyright 2023 The Matrix.org Foundation C.I.C.

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import type { Filter, TransformedToken } from "style-dictionary/types";

/**
 * Excluded tokens in the iOS bundle
 */
export default {
  name: "ios/exclude",
  filter: (token: TransformedToken): boolean => {
    const attrs = token.attributes ?? {};
    const isTypography = token.type === "typography";
    const isLetterSpacing =
      attrs.category === "font" && attrs.type === "letter-spacing";
    return !isTypography && !isLetterSpacing;
  },
} satisfies Filter;
