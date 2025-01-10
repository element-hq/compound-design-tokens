import { forwardRef } from "react";
import { jsx as _jsx } from "react/jsx-runtime";
function SidebarIcon(props, ref) {
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
      d: "M18 3a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm-8 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-8zM8 19H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2z",
      clipRule: "evenodd"
    })
  });
}
;
SidebarIcon.displayName = "SidebarIcon";
export default forwardRef(SidebarIcon);