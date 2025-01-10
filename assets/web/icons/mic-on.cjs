var _reactJsxRuntime = require("react/jsx-runtime");
var React = require("react");
function MicOnIcon(props, ref) {
  return /*#__PURE__*/_reactJsxRuntime.jsxs("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    fill: "currentColor",
    viewBox: "0 0 24 24",
    ref: ref,
    ...props,
    children: [/*#__PURE__*/_reactJsxRuntime.jsx("path", {
      d: "M6 12a1 1 0 1 0-2 0 8 8 0 0 0 7 7.938V21a1 1 0 1 0 2 0v-1.062A8 8 0 0 0 20 12a1 1 0 1 0-2 0 6 6 0 0 1-12 0"
    }), /*#__PURE__*/_reactJsxRuntime.jsx("path", {
      fillRule: "evenodd",
      d: "M14 12V6a2 2 0 1 0-4 0v6a2 2 0 1 0 4 0M12 2a4 4 0 0 0-4 4v6a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4",
      clipRule: "evenodd"
    })]
  });
}
;
MicOnIcon.displayName = "MicOnIcon";
module.exports = React.forwardRef(MicOnIcon);