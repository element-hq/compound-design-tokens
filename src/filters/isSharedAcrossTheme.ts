/*
Copyright 2024 New Vector Ltd.
Copyright 2023 The Matrix.org Foundation C.I.C.

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import type { Filter } from "style-dictionary/types";
import { isNotCoreColor } from "./isCoreColor";

const isSharedAcrossTheme = {
  name: "isSharedAcrossTheme",
  filter: (token) => isNotCoreColor.filter(token) && token.type !== "icon",
} satisfies Filter;

export { isSharedAcrossTheme };
