var _reactJsxRuntime = require("react/jsx-runtime");
var React = require("react");
function EmailIcon(props, ref) {
  return /*#__PURE__*/_reactJsxRuntime.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    fill: "currentColor",
    viewBox: "0 0 24 24",
    ref: ref,
    ...props,
    children: /*#__PURE__*/_reactJsxRuntime.jsx("path", {
      d: "M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm2 0v1.412l8 4.444 8-4.444V6zm0 3.7V18h16V9.7l-7.514 4.174a1 1 0 0 1-.972 0z"
    })
  });
}
;
EmailIcon.displayName = "EmailIcon";
module.exports = React.forwardRef(EmailIcon);