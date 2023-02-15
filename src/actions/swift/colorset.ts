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

import StyleDictionary from "style-dictionary";
import fs from "fs-extra";
import { Theme } from "../../@types";
import { TransformedToken } from "style-dictionary/types/TransformedToken";
import isCoreColor from "../../filters/isCoreColor";

/**
 * Filter the core color
 */
export default {
  do(dictionary, platform): void {
    const assetPath = `${platform.buildPath}/Compound.xcassets`;
    // TODO: Find a better way to do this. We rely on the `light` theme being
    // the first one in the list...
    if (platform.options!.theme === "light") {
      fs.rmSync(assetPath, { recursive: true });
    }
    fs.ensureDirSync(assetPath);

    /**
     * We're only interested in creating colorset for the core tokens. All the
     * other tokens will be defined on a more semantic layer and will reference
     * the values from the colorset
     */
    const coreColorTokens = dictionary.allProperties.filter(
      (token: TransformedToken) => {
        return (
          isCoreColor.matcher(token) &&
          !dictionary.usesReference(token.original.value)
        );
      }
    );

    for (const coreColor of coreColorTokens) {
      const colorsetPath = `${assetPath}/${coreColor.name}.colorset`;
      fs.ensureDirSync(colorsetPath);

      const colorset = getOrCreateColorset(colorsetPath + "/Contents.json");
      colorset.colors.push({
        idiom: "universal",
        color: {
          "color-space": `srgb`,
          components: coreColor.value,
          /**
           * The `theme` is not a `style-dictionary` value, but an option we pass
           * on the iOS config. They refer to the compound themes
           */
          appearances: getAppearances(platform.options!.theme),
        },
      });

      fs.writeFileSync(
        `${colorsetPath}/Contents.json`,
        JSON.stringify(colorset, null, 2)
      );
    }
  },
  undo(dictionary, platform): void {
    const assetPath = `${platform.buildPath}/Compound.xcassets`;
    // TODO: Find a better way to do this. We rely on the `light` theme being
    // the first one in the list...
    if (platform.options!.theme === "light") {
      fs.rmSync(assetPath, { recursive: true });
    }
  },
} as StyleDictionary.Action;

type ColorSetAppearance = {
  appearance: string;
  value: string;
};

function getAppearances(theme: Theme): ColorSetAppearance[] {
  const appearances: ColorSetAppearance[] = [];

  if (theme.startsWith("dark")) {
    appearances.push({
      appearance: "luminosity",
      value: "dark",
    });
  }

  if (theme.endsWith("-hc")) {
    appearances.push({
      appearance: "contrast",
      value: "high",
    });
  }

  return appearances;
}

function getOrCreateColorset(path: string): any {
  let colorset;
  try {
    colorset = JSON.parse(fs.readFileSync(path, "utf8"));
  } catch (e) {}

  return (
    colorset ?? {
      colors: [],
      info: {
        author: "xcode",
        version: 1,
      },
    }
  );
}
