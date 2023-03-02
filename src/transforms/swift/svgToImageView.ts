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

import path, { dirname } from "path";
import fs from "fs-extra";
import { Transform } from "style-dictionary/types/Transform";
import { contents } from "../../actions/swift/colorset";

/**
 * A transformer to change svg path to a SwiftUI Image
 * Also generates the related imageset.
 */
export default {
  type: "value",
  matcher: function (token) {
    return token.type === "icon";
  },
  transformer: function (token, platform) {
    const filename = token.name + ".svg";
    const outputAssetPath = `${platform!.buildPath}/Icons.xcassets`;
    const sourceIconPath = path.join(
      dirname(require.main!.filename),
      token.value
    );

    // Create the xcassets folder and its `Contents.json` root file if they don't exist
    if (!fs.existsSync(outputAssetPath)) {
      fs.ensureDirSync(outputAssetPath);
      fs.writeFileSync(
        `${outputAssetPath}/Contents.json`,
        JSON.stringify(contents),
        "utf-8"
      );
    }

    const imageAssetPath = outputAssetPath + "/" + token.name + ".imageset";
    fs.ensureDirSync(imageAssetPath);
    fs.copyFileSync(sourceIconPath, `${imageAssetPath}/${filename}`);
    fs.writeFileSync(
      `${imageAssetPath}/Contents.json`,
      JSON.stringify(getImagesetContents(filename)),
      "utf-8"
    );

    return `Image("${token.name}", bundle: Bundle.module)`;
  },
} as Transform;

function getImagesetContents(filename: string) {
  return {
    images: [
      {
        filename,
        idiom: "universal",
      },
    ],
    ...contents,
    properties: {
      "preserves-vector-representation": true,
    },
  };
}
