/*
Copyright (c) 2025 Element Creations Ltd.
Copyright 2024-2025 New Vector Ltd.
Copyright 2023 The Matrix.org Foundation C.I.C.

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial.
Please see LICENSE files in the repository root for full details.
*/

import type { Filter } from "style-dictionary/types";
import isCoreToken from "./isCoreToken";

/**
 * Filter the core color
 */
const isCoreColor = {
  name: "isCoreColor",
  filter: (token) =>
    (isCoreToken.filter(token) ||
      token.filePath.includes("theme-semantics-")) &&
    token.attributes?.category === "color",
} satisfies Filter;

const isNotCoreColor = {
  name: "isNotCoreColor",
  filter: (token) => !isCoreColor.filter(token),
} satisfies Filter;

export { isCoreColor, isNotCoreColor };
