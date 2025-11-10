/*
Copyright (c) 2025 Element Creations Ltd.
Copyright 2025 New Vector Ltd.
Copyright 2023 The Matrix.org Foundation C.I.C.

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial.
Please see LICENSE files in the repository root for full details.
*/

import { snakeCase } from "lodash-es";
import type { Transform } from "style-dictionary/types";

/**
 * A transformer to change svg path to vector drawable path
 * Also generates the drawable.
 */
export default {
  name: "kotlin/svgToDrawable",
  type: "value",
  filter: (token) => token.type === "icon",
  transform: (token, _platform) => {
    // Snake case and replace `icon` with `ic` as this is the convention on Android
    // and on Material
    const imageId = snakeCase(token.name.replace("icon", "ic_compound_"));
    return `R.drawable.${imageId}`;
  },
} as Transform;
