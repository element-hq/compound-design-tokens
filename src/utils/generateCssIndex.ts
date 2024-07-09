/*
Copyright 2024 New Vector Ltd.

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

import fs from "fs-extra";
import path from "path";
import { Theme } from "../@types";
import { cssFileName, Tier } from "./cssFileName";

const header = `/* Establish a layer order that allows semantic tokens to be customized, but not base tokens.
 * The layers are prefixed by 'cpd-' because Tailwind will interpret '@layer base' directives.
 */
@layer cpd-semantic, custom, cpd-base;`;

const themes: (Theme | null)[] = [null, "light", "light-hc", "dark", "dark-hc"];
const tiers: Tier[] = ["base", "semantic"];

export function generateCssIndex(): void {
  const imports = [
    ...(function* () {
      for (const theme of themes) {
        for (const tier of tiers) {
          for (const mq of theme === null ? [false] : [false, true]) {
            let mediaQuery = "screen";
            if (mq) {
              mediaQuery += ` and (prefers-color-scheme: ${theme!.includes("light") ? "light" : "dark"})`;
              if (theme!.includes("-hc"))
                mediaQuery += ` and (prefers-contrast: more)`;
            }
            yield `@import url("./${cssFileName(theme, tier, mq)}") layer(cpd-${tier}) ${mediaQuery};`;
          }
        }
      }
    })(),
  ];

  fs.writeFileSync(
    path.join("assets", "web", "css", "compound-design-tokens.css"),
    `${header}\n\n${imports.join("\n")}\n`,
    "utf-8",
  );
}
