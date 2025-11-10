/*
Copyright (c) 2025 Element Creations Ltd.
Copyright 2024-2025 New Vector Ltd.
Copyright 2023 The Matrix.org Foundation C.I.C.

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial.
Please see LICENSE files in the repository root for full details.
*/

import type { Transform, TransformedToken } from "style-dictionary/types";

/**
 * A transformer to change `px` to `sp`
 */
export default {
  name: "kotlin/pxToSp",
  type: "value",
  filter: (token: TransformedToken): boolean => {
    const attrs = token.attributes ?? {};
    return (
      attrs.category === "font" &&
      (attrs.type === "line-height" || attrs.type === "size")
    );
  },
  transform: (token: TransformedToken): string =>
    `${token.value.toString().replace("px", "")}.sp`,
} satisfies Transform;
