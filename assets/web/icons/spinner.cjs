var _reactJsxRuntime = require("react/jsx-runtime");
var React = require("react");
function SpinnerIcon(props, ref) {
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
      d: "M12 4.031a8 8 0 1 0 8 8 1 1 0 0 1 2 0c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10a1 1 0 1 1 0 2Z",
      clipRule: "evenodd"
    })
  });
}
;
SpinnerIcon.displayName = "SpinnerIcon";
module.exports = React.forwardRef(SpinnerIcon);