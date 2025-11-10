/*
Copyright (c) 2025 Element Creations Ltd.
Copyright 2024-2025 New Vector Ltd.
Copyright 2023 The Matrix.org Foundation C.I.C.

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial.
Please see LICENSE files in the repository root for full details.
*/

import type { Filter, TransformedToken } from "style-dictionary/types";

/**
 * Filter only typography tokens.
 */
export default {
  name: "isTypography",
  filter: (token: TransformedToken): boolean => token.type === "typography",
} satisfies Filter;
