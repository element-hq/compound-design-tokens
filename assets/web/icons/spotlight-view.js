import { forwardRef } from "react";
import { jsx as _jsx } from "react/jsx-runtime";
function SpotlightViewIcon(props, ref) {
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
      d: "M20 6H4v12h16zM4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z",
      clipRule: "evenodd"
    })
  });
}
;
SpotlightViewIcon.displayName = "SpotlightViewIcon";
export default forwardRef(SpotlightViewIcon);