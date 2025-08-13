var _reactJsxRuntime = require("react/jsx-runtime");
var React = require("react");
function FullScreenIcon(props, ref) {
  return /*#__PURE__*/_reactJsxRuntime.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    fill: "currentColor",
    viewBox: "0 0 24 24",
    ref: ref,
    ...props,
    children: /*#__PURE__*/_reactJsxRuntime.jsx("path", {
      d: "M4 14a1 1 0 0 1 1 1v4h4a1 1 0 1 1 0 2H3v-6a1 1 0 0 1 1-1m16 0a1 1 0 0 1 1 1v6h-6a1 1 0 1 1 0-2h4v-4a1 1 0 0 1 1-1M9 3a1 1 0 0 1 0 2H5v4a1 1 0 0 1-2 0V3zm12 6a1 1 0 1 1-2 0V5h-4a1 1 0 1 1 0-2h6z"
    })
  });
}
;
FullScreenIcon.displayName = "FullScreenIcon";
module.exports = React.forwardRef(FullScreenIcon);