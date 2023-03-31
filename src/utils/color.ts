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

import { RgbHexColor } from "@adobe/leonardo-contrast-colors";
import chroma from "chroma-js";

/**
 * @param h hue
 * @param s saturation
 * @param l lightness
 * @returns the corresponding hexadecimal color code
 */
export function hslToHex(h: number, s: number, l: number): RgbHexColor {
  return chroma.hsl(h, s / 100, l / 100).hex() as RgbHexColor;
}

/**
 * Most of the following code comes from
 * https://alphredo.app/js/_calculations.js
 */

/**
 * round the number to maximum two decimal point
 * @param num the number to round
 * @returns the rounded number
 */
function roundToTwo(num: number): number {
  return Number.parseFloat(num.toFixed(2));
}

/**
 *
 * @param hex hexadecimal color code
 * @returns an array of rgb composant
 */
const hexToRgb = (hex: string): [number, number, number] => {
  return chroma.hex(hex).rgb();
};

/**
 * Transforms an RGB colour to HSL
 * @param r red
 * @param g green
 * @param b blue
 * @returns An array of HSL composant
 */
const rgbToHsl = (
  r: number,
  g: number,
  b: number
): [number, number, number] => {
  return chroma.rgb(r, g, b).hsl();
};

/**
 * Generates the equivalent alpha color with the lowest opacity for a solid color against a given background.
 * @param colorHex target foreground color
 * @param backgroundHex background color
 * @param strength saturation adjustment.
 * @returns A color in the HSL format
 */
export const getAlphaColor = (
  colorHex: string,
  backgroundHex: string,
  strength = 1
): {
  h: number;
  s: number;
  l: number;
  a: number;
} => {
  // Convert input HEXes to RGBs (arrays)
  const color = hexToRgb(colorHex);
  const surface = hexToRgb(
    backgroundHex === "white"
      ? "#FFFFFF"
      : backgroundHex === "black"
      ? "#000000"
      : backgroundHex
  );

  // Calculate alpha value per channel, pick the highest value
  const alphaPerChannel = color.map((channel, i) => {
    return [
      (channel - surface[i]) / (255 - surface[i]),
      (channel - surface[i]) / (0 - surface[i]),
    ];
  });

  let alpha = roundToTwo(
    Math.max(
      ...alphaPerChannel
        .flat()
        .filter((value) => /^-?\d+\.?\d*$/.test(value.toString()))
    )
  );

  // Force minimum alpha for opaque colors
  // alpha = Math.min(0.96, alpha);

  // Calculate new RGB values based on the alpha
  const alphaColor = color.map((channel, i) => {
    return Math.round((channel - surface[i] + surface[i] * alpha) / alpha);
  });

  let output: { h: number; s: number; l: number; a: number } | undefined;
  // If no alpha color was found, return original, otherwise return alpha color
  if (alphaColor.includes(NaN)) {
    const hsl = rgbToHsl(color[0], color[1], color[2]);
    return {
      h: hsl[0],
      s: Math.round(hsl[1] * strength),
      l: hsl[2],
      a: 1,
    };
  } else {
    const hsl = rgbToHsl(alphaColor[0], alphaColor[1], alphaColor[2]);
    return {
      h: hsl[0],
      s: Math.round(hsl[1] * strength),
      l: hsl[2],
      a: alpha,
    };
  }
};
