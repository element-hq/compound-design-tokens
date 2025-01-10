import { forwardRef } from "react";
import { jsx as _jsx } from "react/jsx-runtime";
function SpinnerIcon(props, ref) {
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
      d: "M12 4.031a8 8 0 1 0 8 8 1 1 0 0 1 2 0c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10a1 1 0 1 1 0 2",
      clipRule: "evenodd"
    })
  });
}
;
SpinnerIcon.displayName = "SpinnerIcon";
export default forwardRef(SpinnerIcon);