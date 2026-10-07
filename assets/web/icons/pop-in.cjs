var _reactJsxRuntime = require("react/jsx-runtime");
var React = require("react");
function PopInIcon(props, ref) {
  return /*#__PURE__*/_reactJsxRuntime.jsxs("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    fill: "currentColor",
    viewBox: "0 0 24 24",
    ref: ref,
    ...props,
    children: [/*#__PURE__*/_reactJsxRuntime.jsx("path", {
      d: "M10 3a1 1 0 1 1 0 2H5v14h14v-5a1 1 0 1 1 2 0v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"
    }), /*#__PURE__*/_reactJsxRuntime.jsx("path", {
      d: "M19.293 3.293a1 1 0 1 1 1.414 1.414L14.414 11H17a1 1 0 1 1 0 2h-5a1 1 0 0 1-1-1V7a1 1 0 1 1 2 0v2.586z"
    })]
  });
}
;
PopInIcon.displayName = "PopInIcon";
module.exports = React.forwardRef(PopInIcon);