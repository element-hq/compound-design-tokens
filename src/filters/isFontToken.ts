/*
Copyright (c) 2025 Element Creations Ltd.
Copyright 2024-2025 New Vector Ltd.
Copyright 2023 The Matrix.org Foundation C.I.C.

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial.
Please see LICENSE files in the repository root for full details.
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
