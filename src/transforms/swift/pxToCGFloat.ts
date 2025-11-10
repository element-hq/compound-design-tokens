/*
Copyright (c) 2025 Element Creations Ltd.
Copyright 2024-2025 New Vector Ltd.
Copyright 2023 The Matrix.org Foundation C.I.C.

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial.
Please see LICENSE files in the repository root for full details.
*/

import type { Transform, TransformedToken } from "style-dictionary/types";

/**
 * A transformer to change tokens.0_5x and keep the underscore
 * after a camel case operation
 */
export default {
  name: "swift/pxToCGFloat",
  type: "value",
  filter: (token: TransformedToken) => {
    const attrs = token.attributes ?? {};
    return (
      attrs.category === "space" ||
      (attrs.category === "border" && attrs.type === "width") ||
      (attrs.category === "font" && attrs.type === "line-height") ||
      (attrs.category === "font" && attrs.type === "size")
    );
  },
  transform: (token: TransformedToken): string =>
    `CGFloat(${token.value.replaceAll('"', "")})`,
} as Transform;
