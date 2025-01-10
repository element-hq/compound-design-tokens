var _reactJsxRuntime = require("react/jsx-runtime");
var React = require("react");
function DarkModeIcon(props, ref) {
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
      d: "M17.983 17.31C13.332 15.66 10 11.22 10 6q0-.907.132-1.78a8 8 0 1 0 7.852 13.091m1.82-1.552c.668.15 1.094.863.737 1.447A10 10 0 0 1 12 22C6.477 22 2 17.523 2 12S6.477 2 12 2c.402 0 .653.416.524.797A10 10 0 0 0 12 6c0 4.768 3.337 8.757 7.803 9.758",
      clipRule: "evenodd"
    })
  });
}
;
DarkModeIcon.displayName = "DarkModeIcon";
module.exports = React.forwardRef(DarkModeIcon);