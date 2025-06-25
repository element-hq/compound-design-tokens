import { createFontStack } from "@capsizecss/core";

// The goal of this is to generate @font-face rules to fallback to local fonts,
// but with font metrics adjusted to match the ones of the font we actually use.
// This way, we can display temporarily a local sans-serif font, laid out very
// close to what Inter will look like once we actually loaded it.
//
// Out of this file, we get two exports:
// - fontFamilyOverrides: a mapping from font we have in tokens to a font-family
//   which has all the overrides
// - fontFaces: the @font-face rules to inject

// The ultimate sans-serif fallback: Arial
import arial700 from "@capsizecss/metrics/arial/700";
import arial700Italic from "@capsizecss/metrics/arial/700italic";
import arial400Italic from "@capsizecss/metrics/arial/italic";
import arial400 from "@capsizecss/metrics/arial/regular";

// Fira Sans
import firaSans500 from "@capsizecss/metrics/firaSans/500";
import firaSans500Italic from "@capsizecss/metrics/firaSans/500italic";
import firaSans600 from "@capsizecss/metrics/firaSans/600";
import firaSans600Italic from "@capsizecss/metrics/firaSans/600italic";
import firaSans400Italic from "@capsizecss/metrics/firaSans/italic";
import firaSans400 from "@capsizecss/metrics/firaSans/regular";

// Helvetica Neue
import helveticaNeue500 from "@capsizecss/metrics/helveticaNeue/500";
import helveticaNeue500Italic from "@capsizecss/metrics/helveticaNeue/500italic";
import helveticaNeue700 from "@capsizecss/metrics/helveticaNeue/700";
import helveticaNeue700Italic from "@capsizecss/metrics/helveticaNeue/700italic";
import helveticaNeue400Italic from "@capsizecss/metrics/helveticaNeue/italic";
import helveticaNeue400 from "@capsizecss/metrics/helveticaNeue/regular";

// Inter: the font we actually use
import inter500 from "@capsizecss/metrics/inter/500";
import inter500Italic from "@capsizecss/metrics/inter/500italic";
import inter600 from "@capsizecss/metrics/inter/600";
import inter600Italic from "@capsizecss/metrics/inter/600italic";
import inter400Italic from "@capsizecss/metrics/inter/italic";
import inter400 from "@capsizecss/metrics/inter/regular";

// Noto Sans
import notoSans500 from "@capsizecss/metrics/notoSans/500";
import notoSans500Italic from "@capsizecss/metrics/notoSans/500italic";
import notoSans600 from "@capsizecss/metrics/notoSans/600";
import notoSans600Italic from "@capsizecss/metrics/notoSans/600italic";
import notoSans400Italic from "@capsizecss/metrics/notoSans/italic";
import notoSans400 from "@capsizecss/metrics/notoSans/regular";

// Roboto
import roboto500 from "@capsizecss/metrics/roboto/500";
import roboto500Italic from "@capsizecss/metrics/roboto/500italic";
import roboto700 from "@capsizecss/metrics/roboto/700";
import roboto700Italic from "@capsizecss/metrics/roboto/700italic";
import roboto400Italic from "@capsizecss/metrics/roboto/italic";
import roboto400 from "@capsizecss/metrics/roboto/regular";

// Segoe UI
import segoeUI600 from "@capsizecss/metrics/segoeUI/600";
import segoeUI600Italic from "@capsizecss/metrics/segoeUI/600italic";
import segoeUI700 from "@capsizecss/metrics/segoeUI/700";
import segoeUI700Italic from "@capsizecss/metrics/segoeUI/700italic";
import segoeUI400Italic from "@capsizecss/metrics/segoeUI/italic";
import segoeUI400 from "@capsizecss/metrics/segoeUI/regular";

// Ubuntu
import ubuntu500 from "@capsizecss/metrics/ubuntu/500";
import ubuntu500Italic from "@capsizecss/metrics/ubuntu/500italic";
import ubuntu700 from "@capsizecss/metrics/ubuntu/700";
import ubuntu700Italic from "@capsizecss/metrics/ubuntu/700italic";
import ubuntu400Italic from "@capsizecss/metrics/ubuntu/italic";
import ubuntu400 from "@capsizecss/metrics/ubuntu/regular";

const { fontFamily: interFontFamily, fontFaces: inter400Stack } =
  createFontStack(
    [
      inter400,
      helveticaNeue400,
      segoeUI400,
      roboto400,
      ubuntu400,
      firaSans400,
      notoSans400,
      arial400,
    ],
    {
      fontFaceProperties: {
        fontStyle: "normal",
        fontWeight: 400,
        fontDisplay: "swap",
      },
    },
  );

const { fontFaces: inter400ItalicStack } = createFontStack(
  [
    inter400Italic,
    helveticaNeue400Italic,
    segoeUI400Italic,
    roboto400Italic,
    ubuntu400Italic,
    firaSans400Italic,
    notoSans400Italic,
    arial400Italic,
  ],
  {
    fontFaceProperties: {
      fontStyle: "italic",
      fontWeight: 400,
      fontDisplay: "swap",
    },
  },
);

const { fontFaces: inter500Stack } = createFontStack(
  [
    inter500,
    helveticaNeue500,
    segoeUI600,
    roboto500,
    ubuntu500,
    firaSans500,
    notoSans500,
  ],
  {
    fontFaceProperties: {
      fontStyle: "normal",
      fontWeight: 500,
      fontDisplay: "swap",
    },
  },
);

const { fontFaces: inter500ItalicStack } = createFontStack(
  [
    inter500Italic,
    helveticaNeue500Italic,
    segoeUI600Italic,
    roboto500Italic,
    ubuntu500Italic,
    firaSans500Italic,
    notoSans500Italic,
  ],
  {
    fontFaceProperties: {
      fontStyle: "italic",
      fontWeight: 500,
      fontDisplay: "swap",
    },
  },
);

const { fontFaces: inter600Stack } = createFontStack(
  [
    inter600,
    helveticaNeue700,
    segoeUI700,
    roboto700,
    ubuntu700,
    firaSans600,
    notoSans600,
    arial700,
  ],
  {
    fontFaceProperties: {
      fontStyle: "normal",
      fontWeight: 600,
      fontDisplay: "swap",
    },
  },
);

const { fontFaces: inter600ItalicStack } = createFontStack(
  [
    inter600Italic,
    helveticaNeue700Italic,
    segoeUI700Italic,
    roboto700Italic,
    ubuntu700Italic,
    firaSans600Italic,
    notoSans600Italic,
    arial700Italic,
  ],
  {
    fontFaceProperties: {
      fontStyle: "italic",
      fontWeight: 600,
      fontDisplay: "swap",
    },
  },
);

// The font token -> font-family mapping used to override
export const fontFamilyOverrides: Record<string, string> = {
  Inter: `${interFontFamily}, sans-serif`,

  // We don't bother to compute accurate fallbacks for the monospace font for
  // now, as we don't use it as much, but we make sure we have at least a
  // cross-browser fallback for it
  Inconsolata: "Inconsolata, ui-monospace, monospace",
};

// The CSS @font-face rules to inject
export const fontFaces = `/* Fallback for Inter regular */
${inter400Stack}

${inter400ItalicStack}


/* Fallback for Inter medium */
${inter500Stack}

${inter500ItalicStack}


/* Fallback for Inter semibold */
${inter600Stack}

${inter600ItalicStack}
`;
