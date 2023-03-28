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

import {
  CssColor,
  ContrastFormula,
  Colorspace,
  InterpolationColorspace,
} from "@adobe/leonardo-contrast-colors";

export type Theme = "light" | "light-hc" | "dark" | "dark-hc";

export type Platform = "web" | "android" | "ios";

export type LeonardoThemeConfig = {
  ratios: number[];
  contrast: number;
  lightness: number;
  saturation: number;
};

export type LeonardoConfig = {
  backgroundColor: string;
  colorSpace: InterpolationColorspace;
  colorSmoothing: boolean;
  formula: ContrastFormula;
  output: Colorspace;
  colors: Record<string, CssColor[]>;
  themes: Record<Theme, LeonardoThemeConfig>;
};
