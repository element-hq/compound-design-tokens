/*
Copyright 2023 New Vector Ltd

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

import { LeonardoConfig } from "../@types";
import { hslToHex } from "./color";

export const leonardoConfig: LeonardoConfig = {
  backgroundColor: "gray",
  colorSpace: "OKLCH",
  colorSmoothing: false,
  formula: "wcag2",
  output: "HEX",
  colors: {
    gray: [hslToHex(215, 20, 90), hslToHex(215, 8, 50), hslToHex(215, 6, 25)],
    red: [hslToHex(358, 100, 58), hslToHex(350, 100, 30)],
    orange: [hslToHex(32, 100, 48), hslToHex(12, 100, 30)],
    yellow: [hslToHex(50, 100, 50), hslToHex(25, 100, 20)],
    lime: [hslToHex(100, 68, 50), hslToHex(115, 86, 25)],
    green: [hslToHex(163, 87, 42), hslToHex(168, 100, 25)],
    cyan: [hslToHex(185, 80, 45), hslToHex(200, 98, 35)],
    blue: [hslToHex(212, 98, 46), hslToHex(222, 95, 25)],
    purple: [hslToHex(258, 94, 64), hslToHex(265, 100, 35)],
    fuchsia: [hslToHex(295, 56, 50), hslToHex(285, 80, 25)],
    pink: [hslToHex(334, 90, 50), hslToHex(330, 91, 25)],
  },
  themes: {
    light: {
      ratios: [
        1.03, 1.06, 1.12, 1.25, 1.5, 1.75, 2.25, 3.5, 5.25, 6.5, 8, 10.5, 13.75,
        16.75,
      ],
      contrast: 1,
      lightness: 100,
      saturation: 100,
    },
    dark: {
      ratios: [
        1.03, 1.06, 1.12, 1.25, 1.5, 1.75, 2.25, 3.5, 5.25, 6.5, 8, 10.5, 13.75,
        16,
      ],
      contrast: 1,
      lightness: 6,
      saturation: 97,
    },
    "light-hc": {
      ratios: [
        1.06, 1.12, 1.25, 1.37, 1.75, 2.25, 3.25, 4.75, 8.87, 10, 11.75, 13.25,
        16, 17,
      ],
      contrast: 1,
      lightness: 100,
      saturation: 100,
    },
    "dark-hc": {
      ratios: [
        1.06, 1.12, 1.25, 1.37, 1.75, 2.25, 3.25, 4.75, 8.87, 10, 11.75, 13.25,
        16, 17,
      ],
      contrast: 1,
      lightness: 6,
      saturation: 97,
    },
  },
};

/**
 * gets the hues defined in the leonardo config
 * @param leonardoConfig
 * @returns the hues
 */
export function getHues(leonardoConfig: LeonardoConfig): string[] {
  return Object.keys(leonardoConfig.colors);
}
