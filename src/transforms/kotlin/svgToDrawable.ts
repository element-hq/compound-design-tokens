/*
Copyright 2025 New Vector Ltd.
Copyright 2023 The Matrix.org Foundation C.I.C.

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "fs-extra";
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
  transform: (token, platform) => {
    const iconPath = path.join(
      fileURLToPath(new URL("../../../", import.meta.url)),
      token.value,
    );
    const resPath = "../res/drawable";

    // Snake case and replace `icon` with `ic` as this is the convention on Android
    // and on Material
    const imageId = snakeCase(token.name.replace("icon", "ic_compound_"));

    const options = {
      fillBlack: true, // Add black color to path element, defaults to false
    };

    return `R.drawable.${imageId}`;
  },
} as Transform;