import { forwardRef } from "react";
import { jsx as _jsx } from "react/jsx-runtime";
function ThemeIcon(props, ref) {
  return /*#__PURE__*/_jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    fill: "currentColor",
    viewBox: "0 0 24 24",
    ref: ref,
    ...props,
    children: /*#__PURE__*/_jsx("path", {
      d: "M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10m1-17.93c3.94.49 7 3.85 7 7.93s-3.05 7.44-7 7.93z"
    })
  });
}
;
ThemeIcon.displayName = "ThemeIcon";
export default forwardRef(ThemeIcon);