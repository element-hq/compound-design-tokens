/*
Copyright (c) 2025 Element Creations Ltd.
Copyright 2024-2025 New Vector Ltd.
Copyright 2023 The Matrix.org Foundation C.I.C.

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial.
Please see LICENSE files in the repository root for full details.
*/

import type { Transform, TransformedToken } from "style-dictionary/types";

/**
 * A transformer to change `px` to `dp`
 */
export default {
  name: "kotlin/pxToDp",
  type: "value",
  transitive: true,
  filter: (token: TransformedToken): boolean => {
    const attrs = token.attributes ?? {};
    return (
      (attrs.category === "border" && attrs.type === "width") ||
      attrs.category === "space"
    );
  },
  transform: (token: TransformedToken): string => {
    const [val, multiplier] = token.value.split("*");

    let transformedValue = !val.includes(".dp")
      ? `${val.trim().replace("px", "")}.dp`
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
} satisfies Transform;
