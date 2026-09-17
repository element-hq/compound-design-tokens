var _reactJsxRuntime = require("react/jsx-runtime");
var React = require("react");
function GuestIcon(props, ref) {
  return /*#__PURE__*/_reactJsxRuntime.jsxs("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    fill: "currentColor",
    viewBox: "0 0 24 24",
    ref: ref,
    ...props,
    children: [/*#__PURE__*/_reactJsxRuntime.jsx("path", {
      fillRule: "evenodd",
      d: "M14.381 4.305a1.04 1.04 0 0 1 1.47 0l6.844 6.842a1.04 1.04 0 0 1 0 1.47l-6.843 6.844a1.04 1.04 0 0 1-1.47 0l-6.843-6.843a1.04 1.04 0 0 1 0-1.471zm-4.75 7.577 5.486 5.486L20.6 11.88l-5.484-5.484z",
      clipRule: "evenodd"
    }), /*#__PURE__*/_reactJsxRuntime.jsx("path", {
      d: "M8.147 4.305a1.04 1.04 0 0 1 1.47 0l1.344 1.343-5.5 5.499a1.04 1.04 0 0 0 0 1.47l5.5 5.5-1.343 1.343a1.04 1.04 0 0 1-1.471 0l-6.844-6.842a1.04 1.04 0 0 1 0-1.471z"
    })]
  });
}
;
GuestIcon.displayName = "GuestIcon";
module.exports = React.forwardRef(GuestIcon);