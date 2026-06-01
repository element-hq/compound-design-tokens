var _reactJsxRuntime = require("react/jsx-runtime");
var React = require("react");
function FlipHorizontalIcon(props, ref) {
  return /*#__PURE__*/_reactJsxRuntime.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    fill: "currentColor",
    viewBox: "0 0 24 24",
    ref: ref,
    ...props,
    children: /*#__PURE__*/_reactJsxRuntime.jsx("path", {
      d: "M12 2a1 1 0 0 1 1 1v18a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1M2 8a1 1 0 0 1 1.6-.8l5.334 4a1 1 0 0 1 0 1.6l-5.334 4A1 1 0 0 1 2 16zm18.4-.8A1 1 0 0 1 22 8v8a1 1 0 0 1-1.6.8l-5.334-4a1 1 0 0 1 0-1.6z"
    })
  });
}
;
FlipHorizontalIcon.displayName = "FlipHorizontalIcon";
module.exports = React.forwardRef(FlipHorizontalIcon);