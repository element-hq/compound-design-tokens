var _reactJsxRuntime = require("react/jsx-runtime");
var React = require("react");
function ZoomOutIcon(props, ref) {
  return /*#__PURE__*/_reactJsxRuntime.jsxs("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    fill: "currentColor",
    viewBox: "0 0 24 24",
    ref: ref,
    ...props,
    children: [/*#__PURE__*/_reactJsxRuntime.jsx("path", {
      d: "M13.5 9.5q.425 0 .713.287.288.288.287.713a.97.97 0 0 1-.287.713.97.97 0 0 1-.713.287h-6a.97.97 0 0 1-.713-.287.97.97 0 0 1-.287-.713q0-.425.287-.713A.97.97 0 0 1 7.5 9.5z"
    }), /*#__PURE__*/_reactJsxRuntime.jsx("path", {
      fillRule: "evenodd",
      d: "M10.5 3a7.5 7.5 0 0 1 5.963 12.049l3.244 3.244a1 1 0 1 1-1.414 1.414l-3.244-3.244A7.5 7.5 0 1 1 10.5 3m0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11",
      clipRule: "evenodd"
    })]
  });
}
;
ZoomOutIcon.displayName = "ZoomOutIcon";
module.exports = React.forwardRef(ZoomOutIcon);