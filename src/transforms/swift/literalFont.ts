import type { Transform } from "style-dictionary/types";

/**
 * Transforms font families into Swift string literals.
 */
// As of Style Dictionary v4, there is no built-in transform that does this
// while actually matching font family tokens, so we have to DIY.
export default {
  name: "swift/literalFont",
  type: "value",
  filter: (token) =>
    token.attributes?.category === "font" &&
    token.attributes?.type === "family",
  transform: (token) => `"${token.value}"`,
} satisfies Transform;
