import { forwardRef } from "react";
import { jsx as _jsx } from "react/jsx-runtime";
function StickerIcon(props, ref) {
  return /*#__PURE__*/_jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    fill: "currentColor",
    viewBox: "0 0 24 24",
    ref: ref,
    ...props,
    children: /*#__PURE__*/_jsx("path", {
      fillRule: "evenodd",
      d: "M17 2a5 5 0 0 1 5 4.999v5.335a5 5 0 0 1-1.58 3.647l-4.978 4.667A5 5 0 0 1 12.023 22H7l-.258-.007A5 5 0 0 1 2 17V7a5 5 0 0 1 5-5zM7 4a3 3 0 0 0-3 3v10a3 3 0 0 0 2.999 3H12v-4a4 4 0 0 1 4-4h4V6.999A3 3 0 0 0 17 4zm9 10a2 2 0 0 0-2 2v3.251l.074-.062 4.978-4.666q.252-.238.441-.523z",
      clipRule: "evenodd"
    })
  });
}
;
StickerIcon.displayName = "StickerIcon";
export default forwardRef(StickerIcon);