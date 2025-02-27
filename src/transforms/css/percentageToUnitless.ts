/*
Copyright 2024 New Vector Ltd.
Copyright 2023 The Matrix.org Foundation C.I.C.

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import type { Transform } from "style-dictionary/types";

/**
 * A transformer to change tokens.0_5x and keep the underscore
 * after a camel case operation
 */
export default {
  name: "css/percentageToUnitless",
  type: "value",
  filter: (token) => {
    const attrs = token.attributes ?? {};
    return attrs.category === "font" && attrs.type === "line-height";
  },
  transform: (token) => {
    const val = Number.parseFloat(token.value.replace("%", ""));
    return `${val / 100}`;
  },
} satisfies Transform;
