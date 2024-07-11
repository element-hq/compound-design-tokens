/*
Copyright 2023 The Matrix.org Foundation C.I.C.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import type { Platform, Theme } from "./src/@types/index";
import * as setupStyleDictionary from "./src/setupStyleDictionary";
import { generateCssIndex } from "./src/utils/generateCssIndex";
import generateIconTokens from "./src/utils/generateIconTokens";

const themes: Theme[] = ["light", "light-hc", "dark", "dark-hc"];
const platforms: Platform[] = ["web", "android", "ios"];

(async () => {
  generateIconTokens();
  generateCssIndex();
  for (const platform of platforms) {
    for (const theme of themes) {
      const sb = await setupStyleDictionary.themed(theme, platform);
      sb.buildAllPlatforms();
    }
    const sb = await setupStyleDictionary.common(platform);
    sb.buildAllPlatforms();
  }
})();
