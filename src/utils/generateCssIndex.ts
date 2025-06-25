/*
Copyright 2024 New Vector Ltd.

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import path from "node:path";
import fs from "fs-extra";
import type { Theme } from "../@types";
import {
  COMPOUND_TOKENS_NAMESPACE,
  cssFileName,
  type Tier,
} from "./cssFileName";

const header = `/* Establish a layer order that allows semantic tokens to be customized, but not base tokens.
 * The layers are prefixed by 'cpd-' because Tailwind will interpret '@layer base' directives.
 */
@layer cpd-semantic, custom, cpd-base;`;

const themes: (Theme | null)[] = [null, "light", "light-hc", "dark", "dark-hc"];
const tiers: Tier[] = ["base", "semantic"];

export function generateCssIndex(): void {
  const imports = [
    `@import url("./${COMPOUND_TOKENS_NAMESPACE}-font-fallbacks.css");`,
    ...(function* () {
      for (const theme of themes) {
        for (const tier of tiers) {
          for (const mq of theme === null ? [false] : [false, true]) {
            let mediaQuery = "screen";
            if (mq) {
              mediaQuery += ` and (prefers-color-scheme: ${theme!.includes("light") ? "light" : "dark"})`;
              if (theme!.includes("-hc"))
                mediaQuery += " and (prefers-contrast: more)";
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
