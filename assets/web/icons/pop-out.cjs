var _reactJsxRuntime = require("react/jsx-runtime");
var React = require("react");
function PopOutIcon(props, ref) {
  return /*#__PURE__*/_reactJsxRuntime.jsxs("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    fill: "currentColor",
    viewBox: "0 0 24 24",
    ref: ref,
    ...props,
    children: [/*#__PURE__*/_reactJsxRuntime.jsx("path", {
      d: "M5 3h6a1 1 0 1 1 0 2H5v14h14v-6a1 1 0 1 1 2 0v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2"
    }), /*#__PURE__*/_reactJsxRuntime.jsx("path", {
      d: "M15 3h5a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0V6.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L17.586 5H15a1 1 0 1 1 0-2"
    })]
  });
}
;
PopOutIcon.displayName = "PopOutIcon";
module.exports = React.forwardRef(PopOutIcon);