var _reactJsxRuntime = require("react/jsx-runtime");
var React = require("react");
function PresenceSolid8X8Icon(props, ref) {
  return /*#__PURE__*/_reactJsxRuntime.jsxs("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    fill: "currentColor",
    viewBox: "0 0 8 8",
    ref: ref,
    ...props,
    children: [/*#__PURE__*/_reactJsxRuntime.jsx("g", {
      clipPath: "url(#a)",
      children: /*#__PURE__*/_reactJsxRuntime.jsx("path", {
        d: "M8 4a4 4 0 1 1-8 0 4 4 0 0 1 8 0"
      })
    }), /*#__PURE__*/_reactJsxRuntime.jsx("defs", {
      children: /*#__PURE__*/_reactJsxRuntime.jsx("clipPath", {
        id: "a",
        children: /*#__PURE__*/_reactJsxRuntime.jsx("path", {
          d: "M0 0h8v8H0z"
        })
      })
    })]
  });
}
;
PresenceSolid8X8Icon.displayName = "PresenceSolid8X8Icon";
module.exports = React.forwardRef(PresenceSolid8X8Icon);