// https://alphredo.app/js/_calculations.js

function roundToTwo(num) {
  return +`${Math.ceil(`${num}e+2`)}e-2`;
}

export const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return [
    Number.parseInt(result[1], 16),
    Number.parseInt(result[2], 16),
    Number.parseInt(result[3], 16),
  ];
};

const rgbToHsl = (r255, g255, b255) => {
  // https://css-tricks.com/converting-color-spaces-in-javascript/

  // Make r, g, and b fractions of 1
  const r = r255 / 255;
  const g = g255 / 255;
  const b = b255 / 255;

  // Find greatest and smallest channel values
  const cmin = Math.min(r, g, b);
  const cmax = Math.max(r, g, b);
  const delta = cmax - cmin;
  let h = 0;
  let s = 0;
  let l = 0;

  // Calculate hue
  // No difference
  if (delta === 0) h = 0;
  // Red is max
  else if (cmax === r) h = ((g - b) / delta) % 6;
  // Green is max
  else if (cmax === g) h = (b - r) / delta + 2;
  // Blue is max
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  // Make negative hues positive behind 360°
  if (h < 0) h += 360;

  // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return [h, s, Math.round(l)];
};

export const hslaToHex = (h, s, l100, alpha) => {
  const l = l100 / 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0")
      .toUpperCase(); // convert to Hex and prefix "0" if needed
  };

  const r = f(0);
  const g = f(8);
  const b = f(4);

  // Clamp alpha to [0,1], convert to 0-255 then to two-digit hex
  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
  const alphaClamped = clamp(alpha, 0, 1);
  const aHex = Math.round(alphaClamped * 255)
    .toString(16)
    .padStart(2, "0")
    .toUpperCase();

  return `#${r}${g}${b}${aHex}`;
};

export const getAlphaColor = (colorHex, backgroundHex, strength = 1) => {
  // Convert input HEXes to RGBs (arrays)
  const color = hexToRgb(colorHex);
  const surface = hexToRgb(
    backgroundHex === "white"
      ? "#FFFFFF"
      : backgroundHex === "black"
        ? "#000000"
        : backgroundHex,
  );

  // Calculate alpha value per channel, pick the highest value
  const alphaPerChannel = color.map((channel, i) => {
    return [
      (channel - surface[i]) / (255 - surface[i]),
      (channel - surface[i]) / (0 - surface[i]),
    ];
  });

  const alpha = roundToTwo(
    Math.max(
      ...alphaPerChannel.flat().filter((value) => /^-?\d+\.?\d*$/.test(value)),
    ),
  );

  // Force minimum alpha for opaque colors
  // alpha = Math.min(0.96, alpha);

  // Calculate new RGB values based on the alpha
  const alphaColor = color.map((channel, i) => {
    return Math.round((channel - surface[i] + surface[i] * alpha) / alpha);
  });

  // If no alpha color was found, return original, otherwise return alpha color
  if (alphaColor.includes(Number.NaN)) {
    const hsl = rgbToHsl(color[0], color[1], color[2]);
    return {
      h: hsl[0],
      s: Math.round(hsl[1] * strength),
      l: hsl[2],
      a: 1,
    };
  }
  const hsl = rgbToHsl(alphaColor[0], alphaColor[1], alphaColor[2]);
  return {
    h: hsl[0],
    s: Math.round(hsl[1] * strength),
    l: hsl[2],
    a: alpha,
  };
};
