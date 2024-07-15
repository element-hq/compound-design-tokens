var _reactJsxRuntime = require("react/jsx-runtime");
var React = require("react");
function MobileIcon(props, ref) {
  return /*#__PURE__*/_reactJsxRuntime.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    fill: "currentColor",
    viewBox: "0 0 24 24",
    ref: ref,
    ...props,
    children: /*#__PURE__*/_reactJsxRuntime.jsx("path", {
      d: "M7 23c-.55 0-1.02-.196-1.412-.587A1.926 1.926 0 0 1 5 21V3c0-.55.196-1.02.588-1.413A1.926 1.926 0 0 1 7 1h10c.55 0 1.02.196 1.413.587.39.393.587.863.587 1.413v18c0 .55-.196 1.02-.587 1.413A1.926 1.926 0 0 1 17 23H7Zm0-5h10V6H7v12Z"
    })
  });
}
;
MobileIcon.displayName = "MobileIcon";
module.exports = React.forwardRef(MobileIcon);