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

import {
  Theme as LeonardoTheme,
  BackgroundColor,
  ContrastColorBackground,
  ContrastColor,
} from "@adobe/leonardo-contrast-colors";

import { Theme } from "../@types";
import { getHues, leonardoConfig } from "./colorConfig";

/**
 * @param theme the theme to generate the config for
 * @returns the JSON containing the tokens
 */
export async function generateColorScales(
  theme: Theme
): Promise<[ContrastColorBackground, ...ContrastColor[]]> {
  const { colorSpace, colorSmoothing, output, formula, backgroundColor } =
    leonardoConfig;
  const contrastRatios = leonardoConfig.themes[theme].ratios;

  const colorMap = getHues(leonardoConfig).reduce((memo, colorName: string) => {
    memo[colorName] = new BackgroundColor({
      name: colorName,
      colorKeys: leonardoConfig.colors[colorName],
      colorspace: colorSpace,
      ratios: contrastRatios,
      smooth: colorSmoothing,
    });
    return memo;
  }, {} as Record<string, BackgroundColor>);

  const leonardoTheme = new LeonardoTheme({
    colors: Object.values(colorMap),
    backgroundColor: colorMap[backgroundColor],
    contrast: leonardoConfig.themes[theme].contrast,
    lightness: leonardoConfig.themes[theme].lightness,
    saturation: leonardoConfig.themes[theme].saturation,
    output,
    formula,
  });

  return leonardoTheme.contrastColors;
}
