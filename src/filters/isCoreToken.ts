/*
Copyright (c) 2025 Element Creations Ltd.
Copyright 2024-2025 New Vector Ltd.
Copyright 2023 The Matrix.org Foundation C.I.C.

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial.
Please see LICENSE files in the repository root for full details.
*/

import type { Filter, TransformedToken } from "style-dictionary/types";

/**
 * Filter the core tokens
 */
export default {
  name: "isCoreToken",
  filter: (token: TransformedToken): boolean => {
    /**
     * all tokens that are not in the semantics files are "core" and should
     * only be used directly under rare occasions
     */
    return !token.filePath.includes("theme-semantics");
  },
} satisfies Filter;
