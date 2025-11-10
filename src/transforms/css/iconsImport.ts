/*
Copyright (c) 2025 Element Creations Ltd.
Copyright 2024-2025 New Vector Ltd.
Copyright 2023 The Matrix.org Foundation C.I.C.

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial.
Please see LICENSE files in the repository root for full details.
*/

import type { Transform } from "style-dictionary/types";

/**
 * transforms path to a `url()` in CSS
 * Prepends `options.pathImportPrefix` if it exists
 */
export default {
  name: "css/iconsImport",
  type: "value",
  filter: (token) => token.type === "icon",
  transform: (token) => `url(../${token.value})`,
} satisfies Transform;
