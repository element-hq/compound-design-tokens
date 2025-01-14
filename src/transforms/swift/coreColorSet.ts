/*
Copyright 2024 New Vector Ltd.
Copyright 2023 The Matrix.org Foundation C.I.C.

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import type { Transform, TransformedToken } from "style-dictionary/types";
import { isCoreColor } from "../../filters/isCoreColor";

/**
 * A transformer to change core colours into a SwiftUI Color loaded
 * from the asset catalog.
 */
export default {
  name: "swift/coreColorSet",
  type: "value",
  filter: isCoreColor.filter,
  transform: (token: TransformedToken) =>
    `Color("${token.name}", bundle: Bundle.module)`,
} as Transform;
