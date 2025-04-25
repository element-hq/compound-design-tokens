import { BackgroundColor, Color, Theme } from "@adobe/leonardo-contrast-colors";
import chroma from "chroma-js";
import * as Alphredo from "./alphredo.js";
import "./styles.css";

// Color spaces for color interpolation
// CAM02, CAM02p, LCH, LAB, HSL, HSLuv, HSV, RGB, OKLAB, OKLCH

// OKLCH, false
// CAM02p, true
// LAB, true
// RGB, true

const leonardoConfig = {
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

// Color playground (temporary overrides)

// A custom color to help generate color overrides.
// leonardoConfig.colors.custom = ["#571EFA"];

// leonardoConfig.colors.gray: [hslToHex(220, 8, 50)],
// leonardoConfig.colors.gray: [hslToHex(210, 10, 50)],
// leonardoConfig.colors.red = [hslToHex(2, 100, 50), hslToHex(350, 100, 30)];

function hslToHex(h, s, l) {
  return chroma.hsl(h, s / 100, l / 100).hex();
}

function getHues(leonardoConfig) {
  return Object.keys(leonardoConfig.colors);
}

function getAlphaColor(color, background) {
  const alphaColor = Alphredo.getAlphaColor(color, background);
  return `hsla(${alphaColor.h}, ${alphaColor.s}%, ${alphaColor.l}%, ${alphaColor.a})`;
}

function getAlphaColorOpacity(color, background) {
  const alphaColor = Alphredo.getAlphaColor(color, background);
  return alphaColor.a;
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

function renderKeyColorsHtml(leonardoConfig) {
  let html = "";

  for (const [key, colors] of Object.entries(leonardoConfig.colors)) {
    // The custom color is shown in the picker below.
    if (key === "custom") continue;

    html += `<div class="key-colors__hue">`;
    for (const color of colors) {
      html += `<div class="key-colors__swatch" style="background-color: ${color}"></div>`;
    }
    html += "</div>";
  }

  const customColor = leonardoConfig.colors.custom?.[0] ?? "#000000";
  html += `<div class="key-colors__picker">
             <label for="color-picker" class="text-body-sm text--primary-{themeName}">🎨</label>
             <input type="color" id="color-picker" name="color-picker" value="${customColor}" />
           </div>`;

  return html;
}

function generateThemesJson(leonardoConfig) {
  const output = {};
  for (const theme of Object.keys(leonardoConfig.themes)) {
    output[theme] = generateThemeJson(leonardoConfig, theme);
  }
  return output;
}

function renderThemeHtml(themeJson, themeName, alpha = false) {
  let html = "";
  const background = themeJson[0].background;

  html += `<div class="theme theme--${themeName}" style="background-color: ${background}">`;

  for (const color of themeJson) {
    if (color.name) {
      if (!alpha) {
        html += `<a class="theme__action" href="${generateContrastGridUrl(
          themesJson,
          themeName,
          color.name,
        )}" target="_blank" rel="noopener">`;
      }
      html += `<div class="theme__hue">`;
      for (const value of color.values) {
        html += `<div class="theme__swatch" style="background-color: ${
          alpha ? getAlphaColor(value.value, background) : value.value
        }"></div>`;
      }
      html += "</div>";
      if (!alpha) {
        html += "</a>";
      }
    }
  }

  html += "</div>";

  return html;
}

function renderThemesHtml(themesJson, alpha = false) {
  const themesHtml = {};

  for (const themeName of Object.keys(themesJson)) {
    themesHtml[themeName] = renderThemeHtml(
      themesJson[themeName],
      themeName,
      alpha,
    );
  }

  return themesHtml;
}

function fromLeonardoColorToTokenStudio(leonardoColors) {
  const background = leonardoColors[0].background;
  const output = {};

  output.color = leonardoColors.reduce((memo, entry) => {
    if (entry.background) {
      memo.theme = {
        bg: {
          value: entry.background,
          type: "color",
          description: "WCAG: 1",
        },
      };
    } else if (entry.values) {
      for (const value of entry.values) {
        const [name, shade] = value.name.split(/(\d+)/);

        memo[name] = {
          ...(memo[name] || {}),
          [shade]: {
            value: value.value,
            type: "color",
            description: `WCAG: ${value.contrast}`,
          },
        };
      }
    }

    return memo;
  }, {});

  output.color.alpha = leonardoColors.reduce((memo, entry) => {
    if (entry.values) {
      for (const value of entry.values) {
        const [name, shade] = value.name.split(/(\d+)/);

        memo[name] = {
          ...(memo[name] || {}),
          [shade]: {
            value: getAlphaColor(value.value, background),
            type: "color",
            description: `WCAG: ${
              value.contrast
            } Opacity: ${getAlphaColorOpacity(value.value, background)}`,
          },
        };
      }
    }

    return memo;
  }, {});

  return output;
}

function renderTokensStudioHtml(themesJson) {
  return Object.keys(themesJson).reduce((html, theme) => {
    return `${html}<details><summary>${theme}</summary><pre>${JSON.stringify(fromLeonardoColorToTokenStudio(themesJson[theme]))}</pre></details>`;
  }, "");
}

function createCssVars(themesJson) {
  let styles = ":root {\n";

  for (const themeName of Object.keys(themesJson)) {
    for (const group of themesJson[themeName]) {
      if (group.background) {
        styles += `--color-bg-${themeName}: ${group.background};\n`;
      } else if (group.values) {
        for (const value of group.values) {
          styles += `--color-${group.name
            .toLowerCase()
            .replace(/\s+/g, "-")}-${value.name.match(/\d+/)}-${themeName}: ${
            value.value
          };\n`;
        }
      }
    }
  }

  styles += "}";

  return styles;
}

function addStylesToHead(styles) {
  const styleEl = document.createElement("style");
  styleEl.innerHTML = styles;
  document.head.appendChild(styleEl);
}

function generateLeonardoUrl(leonardoConfig, theme) {
  const config = {};

  config.baseScale = leonardoConfig.backgroundColor;
  config.contrast = leonardoConfig.themes[theme].contrast;
  config.lightness = leonardoConfig.themes[theme].lightness;
  config.saturation = leonardoConfig.themes[theme].saturation;
  config.formula = leonardoConfig.formula;

  config.colorScales = [];

  for (const [key, value] of Object.entries(leonardoConfig.colors)) {
    config.colorScales.push({
      name: key,
      colorKeys: value,
      colorspace: leonardoConfig.colorSpace,
      ratios: leonardoConfig.themes[theme].ratios,
      smooth: leonardoConfig.colorSmoothing,
    });
  }

  const encodedConfig = encodeURIComponent(JSON.stringify(config));
  const leonardoUrl = `https://leonardocolor.io/theme.html?name=${theme}&config=${encodedConfig}`;

  return leonardoUrl;
}

function renderLeonardoHtml(leonardoConfig) {
  let html = "<ul>";

  for (const themeName of Object.keys(leonardoConfig.themes)) {
    html += `<li><a href="${generateLeonardoUrl(
      leonardoConfig,
      themeName,
    )}" target="_blank" rel="noopener">${themeName} ↗</a></li>`;
    themesHtml[themeName] = renderThemeHtml(themesJson[themeName], themeName);
  }

  html += "</ul>";

  return html;
}

let themesJson = {};
let themesHtml = {};

function renderPage() {
  themesJson = generateThemesJson(leonardoConfig);
  themesHtml = renderThemesHtml(themesJson);

  const keyColorsHtml = renderKeyColorsHtml(leonardoConfig);
  const themesHtmlAlpha = renderThemesHtml(themesJson, true);
  const tokensStudioHtml = renderTokensStudioHtml(themesJson);
  const cssVars = createCssVars(themesJson);
  const leonardoHtml = renderLeonardoHtml(leonardoConfig);

  document.querySelector(".key-colors").innerHTML = keyColorsHtml;

  document.querySelector(".themes").innerHTML =
    Object.values(themesHtml).join("");

  document.querySelector(".themes-alpha").innerHTML =
    Object.values(themesHtmlAlpha).join("");

  document.querySelector(".tokens-studio").innerHTML = tokensStudioHtml;

  addStylesToHead(cssVars);
  document.querySelector(".css-vars__output").innerHTML = cssVars;

  document.querySelector(".leonardo-editor__links").innerHTML = leonardoHtml;

  document.querySelector("#color-picker").addEventListener("input", (event) => {
    // Update the custom colour and re-render.
    leonardoConfig.colors.custom = [event.target.value];
    renderPage();
  });
}

renderPage();

const templateHtmlButtons = `
<div class="bg bg--{themeName}">
  <div class="flex flex-row gap-0_5">
    <div class="button button--gray-{themeName}">
      Button
    </div>
    <div class="button button--blue-{themeName}">
      Button
    </div>
    <div class="button button--red-{themeName}">
      Button
    </div>
  </div>
</div>`;

const templateCssButtons = `
.button--{colorName}-{themeName} {
  background-color: var(--color-{colorName}-900-{themeName});
  color: var(--color-bg-{themeName});
}`;

const templateHtmlLabels = `
<div class="bg bg--{themeName}">
  <div class="flex flex-row gap-0_5">
    <div class="label label--gray-{themeName}">
      Gray
    </div>
    <div class="label label--red-{themeName}">
      Red
    </div>
    <div class="label label--orange-{themeName}">
      Orange
    </div>
    <div class="label label--yellow-{themeName}">
      Yellow
    </div>
    <div class="label label--lime-{themeName}">
      Lime
    </div>
    <div class="label label--green-{themeName}">
      Green
    </div>    
    <div class="label label--cyan-{themeName}">
      Cyan
    </div>
    <div class="label label--blue-{themeName}">
      Blue
    </div>
    <div class="label label--purple-{themeName}">
      Purple
    </div>    
    <div class="label label--fuchsia-{themeName}">
      Fuchsia
    </div>
    <div class="label label--pink-{themeName}">
      Pink
    </div>
  </div>
</div>`;

const templateCssLabels = `
.label--{colorName}-{themeName} {
  background-color: var(--color-{colorName}-300-{themeName});
  border-color: var(--color-{colorName}-600-{themeName});
  color: var(--color-{colorName}-900-{themeName});
}`;

const templateHtmlText = `
<div class="bg bg--{themeName}">
  <div class="m-b-1">
    <h2 class="text-heading text--primary-{themeName}">A Short Heading</h2>
    <p class="text-body-md text--primary-{themeName}">Some body text.</p>
    <p class="text-body-md text--secondary-{themeName}">
      Some secondary text.
    </p>
    <p class="text-body-sm text--secondary-{themeName}">
      And a footnote.
    </p>
  </div>
  <div class="grid grid-cols-3 gap-1">
    <div class="bg bg--01-gray-{themeName}">
      <h2 class="text-heading text--primary-{themeName}">A Short Heading</h2>
      <p class="text-body-md text--primary-{themeName}">Some body text.</p>
      <p class="text-body-md text--secondary-{themeName}">
        Some secondary text.
      </p>
      <p class="text-body-sm text--secondary-{themeName}">
        And a footnote.
      </p>
    </div>
    <div class="bg bg--02-gray-{themeName}">
      <h2 class="text-heading text--primary-{themeName}">A Short Heading</h2>
      <p class="text-body-md text--primary-{themeName}">Some body text.</p>
      <p class="text-body-md text--secondary-{themeName}">
        Some secondary text.
      </p>
      <p class="text-body-sm text--secondary-{themeName}">
        And a footnote.
      </p>
    </div> 
    <div class="bg bg--03-gray-{themeName}">
      <h2 class="text-heading text--primary-{themeName}">A Short Heading</h2>
      <p class="text-body-md text--primary-{themeName}">Some body text.</p>
      <p class="text-body-md text--secondary-{themeName}">
        Some secondary text.
      </p>
      <p class="text-body-sm text--secondary-{themeName}">
        And a footnote.
      </p>
    </div> 
    <div class="bg bg--04-gray-{themeName}">
      <h2 class="text-heading text--primary-{themeName}">A Short Heading</h2>
      <p class="text-body-md text--primary-{themeName}">Some body text.</p>
      <p class="text-body-md text--secondary-strong-{themeName}">
        Some secondary text.
      </p>
      <p class="text-body-sm text--secondary-strong-{themeName}">
        And a footnote.
      </p>
    </div> 
    <div class="bg bg--05-gray-{themeName}">
      <h2 class="text-heading text--primary-{themeName}">A Short Heading</h2>
      <p class="text-body-md text--primary-{themeName}">Some body text.</p>
      <p class="text-body-md text--secondary-strong-{themeName}">
        Some secondary text.
      </p>
      <p class="text-body-sm text--secondary-strong-{themeName}">
        And a footnote.
      </p>
    </div> 
    <div class="bg bg--06-gray-{themeName}">
      <h2 class="text-heading text--primary-{themeName}">A Short Heading</h2>
      <p class="text-body-md text--primary-{themeName}">Some body text.</p>
      <p class="text-body-md text--secondary-strong-{themeName}">
        Some secondary text.
      </p>
      <p class="text-body-sm text--secondary-strong-{themeName}">
        And a footnote.
      </p>
    </div>       
  </div>     
</div>`;

const templateCssText = `
.bg--01-{colorName}-{themeName} {
  background-color: var(--color-{colorName}-100-{themeName});
}
.bg--02-{colorName}-{themeName} {
  background-color: var(--color-{colorName}-200-{themeName});
}
.bg--03-{colorName}-{themeName} {
  background-color: var(--color-{colorName}-300-{themeName});
}
.bg--04-{colorName}-{themeName} {
  background-color: var(--color-{colorName}-400-{themeName});
}
.bg--05-{colorName}-{themeName} {
  background-color: var(--color-{colorName}-500-{themeName});
}
.bg--06-{colorName}-{themeName} {
  background-color: var(--color-{colorName}-600-{themeName});
}
.text--primary-{themeName} {
  color: var(--color-{colorName}-1400-{themeName});
}
.text--secondary-{themeName} {
  color: var(--color-{colorName}-900-{themeName});
}
.text--secondary-strong-{themeName} {
  color: var(--color-{colorName}-1100-{themeName});
}`;

function renderTestHtml(template, themesJson) {
  return Object.keys(themesJson).reduce((html, theme) => {
    return html + template.replaceAll("{themeName}", theme);
  }, "");
}

function addTestHtml(template, themesJson) {
  const testContainer = document.createElement("div");
  testContainer.className = "tests__case";
  testContainer.innerHTML = renderTestHtml(template, themesJson);
  document.querySelector(".tests").appendChild(testContainer);
}

function renderTestCss(template, themesJson, colors) {
  return Object.keys(themesJson)
    .flatMap((theme) =>
      colors.map((color) =>
        template
          .replaceAll("{colorName}", color)
          .replaceAll("{themeName}", theme),
      ),
    )
    .join("\n");
}

function addTestCss(template, themesJson, colors) {
  addStylesToHead(renderTestCss(template, themesJson, colors));
}

addTestHtml(templateHtmlText, themesJson);
addTestCss(templateCssText, themesJson, ["gray"]);

addTestHtml(templateHtmlButtons, themesJson);
addTestCss(templateCssButtons, themesJson, ["gray", "red", "blue"]);

addTestHtml(templateHtmlLabels, themesJson);
addTestCss(templateCssLabels, themesJson, getHues(leonardoConfig));

function generateContrastGridUrl(themesJson, themeName, colorName) {
  const themeJson = themesJson[themeName];
  let contrastGridColors = "";

  for (const color of themeJson) {
    if (color.name === colorName) {
      for (const swatch of color.values) {
        contrastGridColors += `${swatch.value}, ${swatch.name}\n`;
      }
    }
  }

  const contrastGridSettings =
    "es-color-form__tile-size=compact&es-color-form__show-contrast=aaa&es-color-form__show-contrast=aa&es-color-form__show-contrast=aa18";

  contrastGridColors = encodeURIComponent(contrastGridColors);

  const contrastGridUrl = `https://contrast-grid.eightshapes.com/?version=1.1.0&${contrastGridSettings}&background-colors=${contrastGridColors}&foreground-colors=${contrastGridColors}`;

  return contrastGridUrl;
}
