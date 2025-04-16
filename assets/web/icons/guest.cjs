var _reactJsxRuntime = require("react/jsx-runtime");
var React = require("react");
function GuestIcon(props, ref) {
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
      d: "M1.304 12.617a1.04 1.04 0 0 1 0-1.47l6.844-6.843a1.04 1.04 0 0 1 1.47 0l1.343 1.344-5.5 5.5a1.04 1.04 0 0 0 0 1.47l5.5 5.5-1.344 1.343a1.04 1.04 0 0 1-1.47 0zm6.235-1.47a1.04 1.04 0 0 0 0 1.47l6.844 6.844a1.04 1.04 0 0 0 1.47 0l6.843-6.843a1.04 1.04 0 0 0 0-1.47l-6.844-6.844a1.04 1.04 0 0 0-1.47 0z",
      clipRule: "evenodd"
    })
  });
}
;
GuestIcon.displayName = "GuestIcon";
module.exports = React.forwardRef(GuestIcon);