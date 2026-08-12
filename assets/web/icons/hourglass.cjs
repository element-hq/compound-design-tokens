var _reactJsxRuntime = require("react/jsx-runtime");
var React = require("react");
function HourglassIcon(props, ref) {
  return /*#__PURE__*/_reactJsxRuntime.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    fill: "currentColor",
    viewBox: "0 0 24 24",
    ref: ref,
    ...props,
    children: /*#__PURE__*/_reactJsxRuntime.jsx("path", {
      fillRule: "evenodd",
      d: "M20 2a1 1 0 1 1 0 2h-1v3.146l-.004.124a2 2 0 0 1-.865 1.526L13.458 12l4.673 3.204a2 2 0 0 1 .865 1.526l.004.123V20h1a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2h1v-3.146l.004-.123a2 2 0 0 1 .865-1.527L10.541 12 5.869 8.796a2 2 0 0 1-.865-1.526L5 7.146V4H4a1 1 0 0 1 0-2zM7 16.854V20h10v-3.146l-5-3.43zm0-9.708 5 3.43 5-3.43V4H7z",
      clipRule: "evenodd"
    })
  });
}
;
HourglassIcon.displayName = "HourglassIcon";
module.exports = React.forwardRef(HourglassIcon);