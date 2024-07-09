import type StyleDictionary from "style-dictionary";
import type { TransformedToken } from "style-dictionary/types/TransformedToken";
import { ANDROID_INDENT_LEVEL } from "../../utils/constants";

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

    const ARG_INDENT_LEVEL = ANDROID_INDENT_LEVEL + ANDROID_INDENT_LEVEL;

    let output = Object.entries(token.value).reduce(
      (props, [propName, val]) => {
        let output = props;
        if (textStylePropertiesMapping[propName]) {
          output += `${ARG_INDENT_LEVEL + textStylePropertiesMapping[propName]} = `;
          if (propName === "fontFamily") {
            output += "FontFamily.Default";
          } else {
            output += val;
          }
          output += ",\n";
        }

        return output;
      },
      "TextStyle(\n",
    );

    output += `${ARG_INDENT_LEVEL}platformStyle = PlatformTextStyle(includeFontPadding = false),\n`;
    output += `${ARG_INDENT_LEVEL}lineHeightStyle = LineHeightStyle(LineHeightStyle.Alignment.Center, LineHeightStyle.Trim.None)\n`;

    return `${output + ANDROID_INDENT_LEVEL})`;
  },
} as StyleDictionary.Transform;
