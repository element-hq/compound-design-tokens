import { transformDimension } from "@tokens-studio/sd-transforms";
import type { Transform } from "style-dictionary/types";

/**
 * Transforms dimension-like scalar values to CSS px values.
 */
// As of @tokens-studio/sd-transforms v1.0, there is no provided transform that
// does this while matching 'spacing' or 'borderWidth' values, so we customize.
export default {
  name: "css/px",
  type: "value",
  transitive: true,
  filter: (token) =>
    token.type !== undefined &&
    [
      "fontSize",
      "dimension",
      "typography",
      "border",
      "borderWidth",
      "borderRadius",
      "shadow",
      "spacing",
    ].includes(token.$type ?? token.type),
  transform: transformDimension,
} satisfies Transform;
