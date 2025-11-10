/*
Copyright (c) 2025 Element Creations Ltd.
Copyright 2024-2025 New Vector Ltd.
Copyright 2023 The Matrix.org Foundation C.I.C.

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial.
Please see LICENSE files in the repository root for full details.
*/

import type { Transform } from "style-dictionary/types";

/**
 * A transformer to change tokens.0_5x and keep the underscore
 * after a camel case operation
 */
export default {
  name: "css/pxToRem",
  type: "value",
  filter: (token) => {
    const attrs = token.attributes ?? {};
    return attrs.category === "font" && attrs.type === "size";
  },
  transform: (token, options) => {
    const basePxFontSize = options?.basePxFontSize ?? 16;
    const val = Number.parseFloat(token.value.replace("px", ""));
    return `${val / basePxFontSize}rem`;
  },
} satisfies Transform;
