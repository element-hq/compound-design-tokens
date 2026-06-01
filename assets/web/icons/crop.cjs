var _reactJsxRuntime = require("react/jsx-runtime");
var React = require("react");
function CropIcon(props, ref) {
  return /*#__PURE__*/_reactJsxRuntime.jsxs("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    fill: "currentColor",
    viewBox: "0 0 24 24",
    ref: ref,
    ...props,
    children: [/*#__PURE__*/_reactJsxRuntime.jsx("path", {
      d: "M6 2a1 1 0 0 1 1 1v13a1 1 0 0 0 1 1h13a1 1 0 1 1 0 2h-2v2a1 1 0 1 1-2 0v-2H8a3 3 0 0 1-3-3V7H3a1 1 0 0 1 0-2h2V3a1 1 0 0 1 1-1"
    }), /*#__PURE__*/_reactJsxRuntime.jsx("path", {
      d: "M16 5a3 3 0 0 1 3 3v7h-2V8a1 1 0 0 0-1-1H9V5z"
    })]
  });
}
;
CropIcon.displayName = "CropIcon";
module.exports = React.forwardRef(CropIcon);