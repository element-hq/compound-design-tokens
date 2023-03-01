import StyleDictionary from "style-dictionary";
import { TransformedToken } from "style-dictionary/types/TransformedToken";

export default {
  type: "value",
  transitive: true,
  matcher: (token) => token.type === "typography",
  transformer: (token: TransformedToken) => {
    /**
     * Mapping between https://docs.tokens.studio/available-tokens/typography-tokens
     * and https://developer.android.com/reference/kotlin/androidx/compose/ui/text/TextStyle
     * Unsupported property:
     *  - paragraphSpacing
     */
    const textStylePropertiesMapping: Record<string, string> = {
      fontFamily: "fontFamily",
      fontWeight: "fontWeight",
      lineHeight: "lineHeight",
      fontSize: "fontSize",
      letterSpacing: "letterSpacing",
      paragraphIndent: "textIndent",
    };

    return (
      Object.entries(token.value).reduce((props, [propName, val]) => {
        let output = props;
        if (textStylePropertiesMapping[propName]) {
          output += `${textStylePropertiesMapping[propName]} = `;
          if (propName === "fontFamily") {
            output += "FontFamily.Default";
          } else {
            output += val;
          }
          output += `,\n`;
        }

        return output;
      }, "TextStyle(\n") + ")"
    );
  },
} as StyleDictionary.Transform;
