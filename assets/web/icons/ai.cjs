var _reactJsxRuntime = require("react/jsx-runtime");
var React = require("react");
function AiIcon(props, ref) {
  return /*#__PURE__*/_reactJsxRuntime.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    fill: "currentColor",
    viewBox: "0 0 24 24",
    ref: ref,
    ...props,
    children: /*#__PURE__*/_reactJsxRuntime.jsx("path", {
      d: "M9.5 2 11 6.5 15.5 8 11 9.5 9.5 14 8 9.5 3.5 8 8 6.5zm9.5 9 1 3 3 1-3 1-1 3-1-3-3-1 3-1zm-7 6 .75 2.25L15 20l-2.25.75L12 23l-.75-2.25L9 20l2.25-.75z"
    })
  });
}
;
AiIcon.displayName = "AiIcon";
module.exports = React.forwardRef(AiIcon);