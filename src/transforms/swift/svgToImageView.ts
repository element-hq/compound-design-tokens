/*
Copyright (c) 2025 Element Creations Ltd.
Copyright 2024-2025 New Vector Ltd.
Copyright 2023 The Matrix.org Foundation C.I.C.

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial.
Please see LICENSE files in the repository root for full details.
*/

import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "fs-extra";
import type { Transform } from "style-dictionary/types";
import { contents } from "../../actions/swift/colorset";
import { unescapeName } from "./tokenTICamel";

/**
 * A transformer to change svg path to a SwiftUI Image
 * Also generates the related imageset.
 */
export default {
  name: "swift/svgToImageView",
  type: "value",
  filter: (token) => token.type === "icon",
  transform: (token, platform) => {
    const tokenName = unescapeName(token.name);
    const filename = `${tokenName}.svg`;
    const outputAssetPath = `${platform!.buildPath}/Icons.xcassets`;
    const sourceIconPath = path.join(
      fileURLToPath(new URL("../../../", import.meta.url)),
      token.value,
    );

    // Create the xcassets folder and its `Contents.json` root file if they don't exist
    if (!fs.existsSync(outputAssetPath)) {
      fs.ensureDirSync(outputAssetPath);
      fs.writeFileSync(
        `${outputAssetPath}/Contents.json`,
        JSON.stringify(contents),
        "utf-8",
      );
    }

    const imageAssetPath = `${outputAssetPath}/${tokenName}.imageset`;
    fs.ensureDirSync(imageAssetPath);

    const svgContent = fs.readFileSync(sourceIconPath, "utf8");
    fs.writeFileSync(
      `${imageAssetPath}/${filename}`,
      // currentColor is not previewable in XCode so we need to change it
      // It would theoratically still works but is not convienient when developing
      // as the icon is invisible in the image set
      svgContent.replaceAll("currentColor", "black"),
      "utf-8",
    );

    fs.writeFileSync(
      `${imageAssetPath}/Contents.json`,
      JSON.stringify(getImagesetContents(filename)),
      "utf-8",
    );

    return `Image("${tokenName}", bundle: Bundle.module)`;
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
      "template-rendering-intent": "template",
    },
  };
}
