var _reactJsxRuntime = require("react/jsx-runtime");
var React = require("react");
function DragListIcon(props, ref) {
  return /*#__PURE__*/_reactJsxRuntime.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    fill: "currentColor",
    viewBox: "0 0 24 24",
    ref: ref,
    ...props,
    children: /*#__PURE__*/_reactJsxRuntime.jsx("path", {
      d: "M5 15a.967.967 0 0 1-.713-.287A.968.968 0 0 1 4 14c0-.283.096-.52.287-.713A.967.967 0 0 1 5 13h14a.97.97 0 0 1 .712.287c.192.192.288.43.288.713s-.096.52-.288.713A.968.968 0 0 1 19 15H5Zm0-4a.967.967 0 0 1-.713-.287A.968.968 0 0 1 4 10c0-.283.096-.52.287-.713A.968.968 0 0 1 5 9h14a.97.97 0 0 1 .712.287c.192.192.288.43.288.713s-.096.52-.288.713A.968.968 0 0 1 19 11H5Z"
    })
  });
}
;
DragListIcon.displayName = "DragListIcon";
module.exports = React.forwardRef(DragListIcon);