var _reactJsxRuntime = require("react/jsx-runtime");
var React = require("react");
function SpotlightIcon(props, ref) {
  return /*#__PURE__*/_reactJsxRuntime.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    fill: "currentColor",
    ref: ref,
    ...props,
    children: /*#__PURE__*/_reactJsxRuntime.jsx("path", {
      d: "M5 5h14v8h-5a1 1 0 0 0-1 1v5H5zm10 14v-4h4v4zM5 21h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    })
  });
}
;
SpotlightIcon.displayName = "SpotlightIcon";
module.exports = React.forwardRef(SpotlightIcon);