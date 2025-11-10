/*
Copyright (c) 2025 Element Creations Ltd.
Copyright 2024-2025 New Vector Ltd.
Copyright 2023 The Matrix.org Foundation C.I.C.

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial.
Please see LICENSE files in the repository root for full details.
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
