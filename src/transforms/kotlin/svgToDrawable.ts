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

import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "fs-extra";
import _ from "lodash-es";
import type { Transform } from "style-dictionary/types";
import svg2vectordrawable from "svg2vectordrawable";

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
    const imageId = _.snakeCase(token.name.replace("icon", "ic_compound_"));

    const options = {
      fillBlack: true, // Add black color to path element, defaults to false
    };

    const svgContent = fs.readFileSync(iconPath, "utf8");
    svg2vectordrawable(svgContent, options).then((xmlContent) => {
      const outputFolder = path.join(platform?.buildPath!, resPath);
      fs.ensureDirSync(outputFolder);
      fs.writeFileSync(`${outputFolder}/${imageId}.xml`, xmlContent, "utf8");
    });

    return `R.drawable.${imageId}`;
  },
} as Transform;
