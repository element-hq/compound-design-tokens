import { forwardRef } from "react";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function ImageIcon(props, ref) {
  return /*#__PURE__*/_jsxs("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    fill: "currentColor",
    viewBox: "0 0 24 24",
    ref: ref,
    ...props,
    children: [/*#__PURE__*/_jsx("path", {
      d: "M17 9a2 2 0 1 1-4 0 2 2 0 0 1 4 0"
    }), /*#__PURE__*/_jsx("path", {
      d: "M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm14 2v14H5v-3.172l4-4L16.172 19H19l-8.586-8.586a2 2 0 0 0-2.828 0L5 13V5z"
    })]
  });
}
;
ImageIcon.displayName = "ImageIcon";
export default forwardRef(ImageIcon);