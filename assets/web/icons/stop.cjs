var _reactJsxRuntime = require("react/jsx-runtime");
var React = require("react");
function StopIcon(props, ref) {
  return /*#__PURE__*/_reactJsxRuntime.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    fill: "currentColor",
    viewBox: "0 0 24 24",
    ref: ref,
    ...props,
    children: /*#__PURE__*/_reactJsxRuntime.jsx("path", {
      d: "M16 18v2H8v-2zm2-2V8a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2v2a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4v-2a2 2 0 0 0 2-2"
    })
  });
}
;
StopIcon.displayName = "StopIcon";
module.exports = React.forwardRef(StopIcon);