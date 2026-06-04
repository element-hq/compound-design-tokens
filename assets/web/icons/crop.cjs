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
      fillRule: "evenodd",
      d: "M6 4a1 1 0 0 0-1 1v2H3a1 1 0 1 0 0 2h2v8a3 3 0 0 0 3 3h8v2a1 1 0 0 0 2 0v-2h2a1 1 0 1 0 0-2h-2v-8a3 3 0 0 0-3-3H7V5a1 1 0 0 0-1-1m9 5a1 1 0 0 1 1 1v8H8a1 1 0 0 1-1-1V9z",
      clipRule: "evenodd"
    }), /*#__PURE__*/_reactJsxRuntime.jsx("path", {
      d: "M15.707.293a1 1 0 0 0-1.414 0l-2 2a1 1 0 0 0 0 1.414l2 2a1 1 0 1 0 1.414-1.414l-.275-.276A6 6 0 0 1 21 10a1 1 0 1 0 2 0 8 8 0 0 0-7.596-7.99l.303-.303a1 1 0 0 0 0-1.414"
    })]
  });
}
;
CropIcon.displayName = "CropIcon";
module.exports = React.forwardRef(CropIcon);