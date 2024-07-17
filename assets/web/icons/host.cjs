var _reactJsxRuntime = require("react/jsx-runtime");
var React = require("react");
function HostIcon(props, ref) {
  return /*#__PURE__*/_reactJsxRuntime.jsxs("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    fill: "currentColor",
    viewBox: "0 0 24 24",
    ref: ref,
    ...props,
    children: [/*#__PURE__*/_reactJsxRuntime.jsx("path", {
      d: "M16.712 6.713A.968.968 0 0 1 16 7a.968.968 0 0 1-.713-.287A.967.967 0 0 1 15 6c0-.283.096-.52.287-.713A.968.968 0 0 1 16 5a.97.97 0 0 1 .712.287c.192.192.288.43.288.713s-.096.52-.288.713Z"
    }), /*#__PURE__*/_reactJsxRuntime.jsx("path", {
      fillRule: "evenodd",
      d: "M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H6Zm12 2H6v4h12V4ZM6 12v-2h12v2H6Zm0 2v2h12v-2H6Zm0 6v-2h12v2H6Z",
      clipRule: "evenodd"
    })]
  });
}
;
HostIcon.displayName = "HostIcon";
module.exports = React.forwardRef(HostIcon);