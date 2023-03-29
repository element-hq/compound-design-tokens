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

import fs from "fs-extra";
import path from "path";
import process from "process";

/**
 * Generates `icons/$icons.json` off all the SVG icons discovered in the
 * `icons/` folder
 */
export default function generateIconTokens(): void {
  const outputFileName = "$icons.json";
  const folder = "icons/";
  const iconsFolder = path.join(process.cwd(), folder);

  const iconsPath = fs
    .readdirSync(iconsFolder)
    .filter((asset) => asset !== ".DS_Store" && asset !== outputFileName)
    .map((file) => {
      const assetPath = path.join(iconsFolder, file);
      const parsedPath = path.parse(assetPath);
      return [
        parsedPath.name,
        {
          value: `${folder}${parsedPath.name}.svg`,
          type: "icon",
        },
      ];
    });

  fs.writeFileSync(
    path.join(iconsFolder, outputFileName),
    JSON.stringify({ icon: Object.fromEntries(iconsPath) }),
    "utf-8"
  );
}
