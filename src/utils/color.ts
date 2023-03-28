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
 * TODO: @jano to add description
 * @param num ?
 * @returns ?
 */
function roundToTwo(num: number): number {
  // @ts-ignore
  return +(Math.ceil(num + "e+2") + "e-2");
}

/**
 * @param num the number to clamp
 * @param min the min value
 * @param max the max value
 * @returns the clamped output
 */
export const clamp = (num: number, min: number, max: number): number =>
  Math.min(Math.max(num, min), max);

/**
 *
 * @param hex hexadecimal color code
 * @returns an array of rgb composant
 */
const hexToRgb = (hex: string): number[] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return [
    parseInt(result?.[1] ?? "0", 16),
    parseInt(result?.[2] ?? "0", 16),
    parseInt(result?.[3] ?? "0", 16),
  ];
};

/**
 * Transforms an RGB colour to HSL
 * @param r red
 * @param g green
 * @param b blue
 * @returns An array of HSL composant
 */
const rgbToHsl = (r: number, g: number, b: number): number[] => {
  // https://css-tricks.com/converting-color-spaces-in-javascript/

  // Make r, g, and b fractions of 1
  r /= 255;
  g /= 255;
  b /= 255;

  // Find greatest and smallest channel values
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  // Calculate hue
  // No difference
  if (delta == 0) h = 0;
  // Red is max
  else if (cmax == r) h = ((g - b) / delta) % 6;
  // Green is max
  else if (cmax == g) h = (b - r) / delta + 2;
  // Blue is max
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  // Make negative hues positive behind 360°
  if (h < 0) h += 360;

  // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return [h, s, Math.round(l)];
};

/**
 * Transforms HSLA to HEX
 * @param h hue
 * @param s saturation
 * @param l lightness
 * @param alpha transparency
 * @returns an hexadecimal color code
 */
export const hslaToHex = (
  h: number,
  s: number,
  l: number,
  alpha: number
): string => {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0")
      .toUpperCase(); // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}, ${alpha}`;
};

/**
 * TODO
 * @param colorHex TODO –  ...
 * @param backgroundHex TODO – ...
 * @param strength TODO – ...
 * @returns A color in the HSLA format
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
