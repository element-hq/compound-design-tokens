var _reactJsxRuntime = require("react/jsx-runtime");
var React = require("react");
function FilterIcon(props, ref) {
  return /*#__PURE__*/_reactJsxRuntime.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    fill: "currentColor",
    viewBox: "0 0 24 24",
    ref: ref,
    ...props,
    children: /*#__PURE__*/_reactJsxRuntime.jsx("path", {
      d: "M5 7a1 1 0 0 0 0 2h14a1 1 0 1 0 0-2zm3 4a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2zm2 5a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2h-2a1 1 0 0 1-1-1"
    })
  });
}
;
FilterIcon.displayName = "FilterIcon";
module.exports = React.forwardRef(FilterIcon);