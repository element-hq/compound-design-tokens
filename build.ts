/*
Copyright 2024 New Vector Ltd.
Copyright 2023 The Matrix.org Foundation C.I.C.

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import type { Platform, Theme } from "./src/@types/index";
import * as setupStyleDictionary from "./src/setupStyleDictionary";
import { generateCssIndex } from "./src/utils/generateCssIndex";
import generateIconComponents from "./src/utils/generateIconComponents";
import { normalizeTokens } from "./src/utils/normalizeTokens";

const themes: Theme[] = ["light", "light-hc", "dark", "dark-hc"];
const platforms: Platform[] = ["web", "android", "ios"];

await normalizeTokens();
await generateIconComponents();
generateCssIndex();

for (const platform of platforms) {
  for (const theme of themes) {
    const sb = await setupStyleDictionary.themed(theme, platform);
    sb.buildAllPlatforms();
  }
  const sb = await setupStyleDictionary.common(platform);
  sb.buildAllPlatforms();
}
