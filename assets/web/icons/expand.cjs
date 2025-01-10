var _reactJsxRuntime = require("react/jsx-runtime");
var React = require("react");
function ExpandIcon(props, ref) {
  return /*#__PURE__*/_reactJsxRuntime.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    fill: "currentColor",
    viewBox: "0 0 24 24",
    ref: ref,
    ...props,
    children: /*#__PURE__*/_reactJsxRuntime.jsx("path", {
      d: "M21 3.997a1 1 0 0 0-.29-.702l-.005-.004A1 1 0 0 0 20 3h-8a1 1 0 1 0 0 2h5.586L5 17.586V12a1 1 0 1 0-2 0v8.003a1 1 0 0 0 .29.702l.005.004c.18.18.43.291.705.291h8a1 1 0 1 0 0-2H6.414L19 6.414V12a1 1 0 1 0 2 0z"
    })
  });
}
;
ExpandIcon.displayName = "ExpandIcon";
module.exports = React.forwardRef(ExpandIcon);