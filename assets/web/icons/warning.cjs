var _reactJsxRuntime = require("react/jsx-runtime");
var React = require("react");
function WarningIcon(props, ref) {
  return /*#__PURE__*/_reactJsxRuntime.jsxs("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    fill: "currentColor",
    viewBox: "0 0 24 24",
    ref: ref,
    ...props,
    children: [/*#__PURE__*/_reactJsxRuntime.jsx("path", {
      d: "M12.713 17.713A.968.968 0 0 1 12 18a.968.968 0 0 1-.713-.287A.967.967 0 0 1 11 17a.97.97 0 0 1 .287-.712A.968.968 0 0 1 12 16a.97.97 0 0 1 .713.288A.968.968 0 0 1 13 17a.97.97 0 0 1-.287.713Zm0-4A.968.968 0 0 1 12 14a.968.968 0 0 1-.713-.287A.967.967 0 0 1 11 13V9a.97.97 0 0 1 .287-.712A.968.968 0 0 1 12 8a.97.97 0 0 1 .713.288A.968.968 0 0 1 13 9v4a.97.97 0 0 1-.287.713Z"
    }), /*#__PURE__*/_reactJsxRuntime.jsx("path", {
      fillRule: "evenodd",
      d: "M10.264 3.039c.767-1.344 2.705-1.344 3.472 0l8.554 14.969c.762 1.333-.2 2.992-1.736 2.992H3.446c-1.535 0-2.498-1.659-1.736-2.992l8.553-14.969ZM3.446 19 12 4.031l8.554 14.97H3.446Z",
      clipRule: "evenodd"
    })]
  });
}
;
WarningIcon.displayName = "WarningIcon";
module.exports = React.forwardRef(WarningIcon);