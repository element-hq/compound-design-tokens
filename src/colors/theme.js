import { BackgroundColor, Color, Theme } from "@adobe/leonardo-contrast-colors";
import chroma from "chroma-js";
import { getAlphaColor, hslaToHex } from "./alphredo";

// Color spaces for color interpolation
// CAM02, CAM02p, LCH, LAB, HSL, HSLuv, HSV, RGB, OKLAB, OKLCH

// OKLCH, false
// CAM02p, true
// LAB, true
// RGB, true

export const leonardoConfig = {
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
    lightHc: {
      ratios: [
        1.06, 1.12, 1.25, 1.37, 1.75, 2.25, 3.25, 4.75, 8.87, 10, 11.75, 13.25,
        16, 17,
      ],
      contrast: 1,
      lightness: 100,
      saturation: 100,
    },
    darkHc: {
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

export function hslToHex(h, s, l) {
  return chroma.hsl(h, s / 100, l / 100).hex();
}

function generateThemeJson(leonardoConfig, theme) {
  const colorSpace = leonardoConfig.colorSpace;
  const colorSmoothing = leonardoConfig.colorSmoothing;
  const contrastRatios = leonardoConfig.themes[theme].ratios;

  const gray = new BackgroundColor({
    name: "gray",
    colorKeys: leonardoConfig.colors.gray,
    colorspace: colorSpace,
    ratios: contrastRatios,
    smooth: colorSmoothing,
  });

  const blue = new Color({
    name: "blue",
    colorKeys: leonardoConfig.colors.blue,
    colorspace: colorSpace,
    ratios: contrastRatios,
    smooth: colorSmoothing,
  });

  const cyan = new Color({
    name: "cyan",
    colorKeys: leonardoConfig.colors.cyan,
    colorspace: colorSpace,
    ratios: contrastRatios,
    smooth: colorSmoothing,
  });

  const fuchsia = new Color({
    name: "fuchsia",
    colorKeys: leonardoConfig.colors.fuchsia,
    colorspace: colorSpace,
    ratios: contrastRatios,
    smooth: colorSmoothing,
  });

  const green = new Color({
    name: "green",
    colorKeys: leonardoConfig.colors.green,
    colorspace: colorSpace,
    ratios: contrastRatios,
    smooth: colorSmoothing,
  });

  const lime = new Color({
    name: "lime",
    colorKeys: leonardoConfig.colors.lime,
    colorspace: colorSpace,
    ratios: contrastRatios,
    smooth: colorSmoothing,
  });

  const orange = new Color({
    name: "orange",
    colorKeys: leonardoConfig.colors.orange,
    colorspace: colorSpace,
    ratios: contrastRatios,
    smooth: colorSmoothing,
  });

  const pink = new Color({
    name: "pink",
    colorKeys: leonardoConfig.colors.pink,
    colorspace: colorSpace,
    ratios: contrastRatios,
    smooth: colorSmoothing,
  });

  const purple = new Color({
    name: "purple",
    colorKeys: leonardoConfig.colors.purple,
    colorspace: colorSpace,
    ratios: contrastRatios,
    smooth: colorSmoothing,
  });

  const red = new Color({
    name: "red",
    colorKeys: leonardoConfig.colors.red,
    colorspace: colorSpace,
    ratios: contrastRatios,
    smooth: colorSmoothing,
  });

  const yellow = new Color({
    name: "yellow",
    colorKeys: leonardoConfig.colors.yellow,
    colorspace: colorSpace,
    ratios: contrastRatios,
    smooth: colorSmoothing,
  });

  const colorMap = {
    gray,
    red,
    orange,
    yellow,
    lime,
    green,
    cyan,
    blue,
    purple,
    fuchsia,
    pink,
  };

  // Add in the custom colour at the end if it has been set.
  if (leonardoConfig.colors.custom) {
    colorMap.custom = new Color({
      name: "custom",
      colorKeys: leonardoConfig.colors.custom,
      colorspace: colorSpace,
      ratios: contrastRatios,
      smooth: colorSmoothing,
    });
  }

  const leonardoTheme = new Theme({
    colors: Object.values(colorMap),
    backgroundColor: colorMap[leonardoConfig.backgroundColor],
    contrast: leonardoConfig.themes[theme].contrast,
    lightness: leonardoConfig.themes[theme].lightness,
    saturation: leonardoConfig.themes[theme].saturation,
    output: leonardoConfig.output,
    formula: leonardoConfig.formula,
  });

  return leonardoTheme.contrastColors;
}

export function generateThemesJson(leonardoConfig) {
  const output = {};
  for (const theme of Object.keys(leonardoConfig.themes)) {
    output[theme] = generateThemeJson(leonardoConfig, theme);
  }
  return output;
}

export function generateCustomColors(customColorHex) {
  leonardoConfig.colors.custom = [customColorHex];
  const themes = generateThemesJson(leonardoConfig);

  return Object.fromEntries(
    Object.entries(themes).map(([theme, contrastColors]) => {
      const customColors = contrastColors.find(
        (item) => item && item.name === "custom",
      );

      const baseMap = Object.fromEntries(
        customColors.values.map(({ name, value }) => [name, value]),
      );

      // include the alpha variants too
      for (const [name, value] of Object.entries(baseMap)) {
        const alphaColor = getAlphaColor(value, contrastColors[0].background);
        baseMap[`alpha${name.charAt(0).toUpperCase() + name.slice(1)}`] =
          hslaToHex(alphaColor.h, alphaColor.s, alphaColor.l, alphaColor.a);
      }

      return [theme, baseMap];
    }),
  );
}
