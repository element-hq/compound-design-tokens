var _reactJsxRuntime = require("react/jsx-runtime");
var React = require("react");
function CloseIcon(props, ref) {
  return /*#__PURE__*/_reactJsxRuntime.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    fill: "currentColor",
    viewBox: "0 0 24 24",
    ref: ref,
    ...props,
    children: /*#__PURE__*/_reactJsxRuntime.jsx("path", {
      d: "M6.293 6.293a1 1 0 0 1 1.414 0L12 10.586l4.293-4.293a1 1 0 1 1 1.414 1.414L13.414 12l4.293 4.293a1 1 0 0 1-1.414 1.414L12 13.414l-4.293 4.293a1 1 0 0 1-1.414-1.414L10.586 12 6.293 7.707a1 1 0 0 1 0-1.414"
    })
  });
}
;
CloseIcon.displayName = "CloseIcon";
module.exports = React.forwardRef(CloseIcon);