/*
Copyright (c) 2025 Element Creations Ltd.
Copyright 2024-2025 New Vector Ltd.
Copyright 2023 The Matrix.org Foundation C.I.C.

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial.
Please see LICENSE files in the repository root for full details.
*/

import fs from "fs-extra";
import type { Action, TransformedToken } from "style-dictionary/types";
import { getReferences, usesReferences } from "style-dictionary/utils";
import type { Theme } from "../../@types";
import { isCoreColor } from "../../filters/isCoreColor";
import { isCssGradient } from "../../filters/isCssGradient";

/**
 * Filter the core color
 */
export default {
  name: "ios/colorset",
  do(dictionary, platform): void {
    const assetPath = `${platform.buildPath}/Colors.xcassets`;
    // TODO: Find a better way to do this. We rely on the `light` theme being
    // the first one in the list...
    if (platform.options!.theme === "light") {
      fs.rmSync(assetPath, { recursive: true });
      fs.ensureDirSync(assetPath);
      // We need an empty `Contents.json` file at the root of the xcassets folder
      // and another one in each colorset folder too
      fs.writeFileSync(
        `${assetPath}/Contents.json`,
        JSON.stringify(contents),
        "utf8",
      );
    } else {
      fs.ensureDirSync(assetPath);
    }

    /**
     * We're only interested in creating colorsets for the core colors (which includes
     * the asymmetric semantic tokens). All the symmetric semantic tokens will reference
     * the values from the generated colorsets
     */
    const coreColorTokens = dictionary.allTokens.filter(
      (token: TransformedToken) => {
        return isCoreColor.filter(token) && !isCssGradient.filter(token);
      },
    );

    for (const coreColor of coreColorTokens) {
      const colorsetPath = `${assetPath}/${coreColor.name}.colorset`;
      fs.ensureDirSync(colorsetPath);

      const colorset = getOrCreateColorset(`${colorsetPath}/Contents.json`);

      /**
       * We need to resolve the references for asymmetric tokens otherwise there isn't
       * an RGB color value in the attributes that we can use to populate the JSON.
       */
      const resolvedToken = usesReferences(coreColor.original.value)
        ? getReferences(coreColor.original.value, dictionary.tokens)[0]
        : coreColor;

      const color: {
        idiom: string;
        appearances?: ColorSetAppearance[];
        color: SRGBColor;
      } = {
        idiom: "universal",
        appearances: getAppearances(platform.options!.theme),
        color: {
          "color-space": "srgb",
          components: getSRGBComponent(
            resolvedToken.attributes!.rgb as {
              a: number;
              r: number;
              g: number;
              b: number;
            },
          ),
          /**
           * The `theme` is not a `style-dictionary` value, but an option we pass
           * on the iOS config. They refer to the compound themes
           */
        },
      };
      if (color.appearances!.length === 0) {
        color.appearances = undefined;
      }

      colorset.colors.push(color);

      fs.writeFileSync(
        `${colorsetPath}/Contents.json`,
        JSON.stringify(colorset, null, 2),
      );
    }
  },
  undo(_dictionary, platform): void {
    const assetPath = `${platform.buildPath}/Colors.xcassets`;
    // TODO: Find a better way to do this. We rely on the `light` theme being
    // the first one in the list...
    if (platform.options!.theme === "light") {
      fs.rmSync(assetPath, { recursive: true });
    }
  },
} as Action;

type ColorSetAppearance = {
  appearance: string;
  value: string;
};

type SRGBColor = {
  "color-space": "srgb";
  components: {
    alpha: string;
    red: string;
    green: string;
    blue: string;
  };
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

function getOrCreateColorset(path: string): { colors: unknown[] } {
  try {
    return JSON.parse(fs.readFileSync(path, "utf8"));
  } catch (_e) {
    return { colors: [], ...contents };
  }
}

export const contents = {
  info: {
    author: "xcode",
    version: 1,
  },
};

const getSRGBComponent = ({
  a,
  r,
  g,
  b,
}: {
  a: number;
  r: number;
  g: number;
  b: number;
}): SRGBColor["components"] => {
  return {
    alpha: a.toFixed(4).toString(),
    red: (r / 255).toFixed(4).toString(),
    green: (g / 255).toFixed(4).toString(),
    blue: (b / 255).toFixed(4).toString(),
  };
};
