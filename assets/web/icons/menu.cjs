var _reactJsxRuntime = require("react/jsx-runtime");
var React = require("react");
function MenuIcon(props, ref) {
  return /*#__PURE__*/_reactJsxRuntime.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    fill: "currentColor",
    viewBox: "0 0 24 24",
    ref: ref,
    ...props,
    children: /*#__PURE__*/_reactJsxRuntime.jsx("path", {
      d: "M4 8a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1m0 4a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1m1 3a1 1 0 1 0 0 2h14a1 1 0 1 0 0-2z"
    })
  });
}
;
MenuIcon.displayName = "MenuIcon";
module.exports = React.forwardRef(MenuIcon);