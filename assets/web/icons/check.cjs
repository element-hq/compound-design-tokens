var _reactJsxRuntime = require("react/jsx-runtime");
var React = require("react");
function CheckIcon(props, ref) {
  return /*#__PURE__*/_reactJsxRuntime.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    fill: "currentColor",
    viewBox: "0 0 24 24",
    ref: ref,
    ...props,
    children: /*#__PURE__*/_reactJsxRuntime.jsx("path", {
      d: "M9.55 17.575c-.133 0-.258-.02-.375-.063a.876.876 0 0 1-.325-.212L4.55 13c-.183-.183-.27-.42-.263-.713.009-.291.105-.529.288-.712a.948.948 0 0 1 .7-.275.95.95 0 0 1 .7.275L9.55 15.15l8.475-8.475c.183-.183.42-.275.713-.275.291 0 .529.092.712.275.183.183.275.42.275.713 0 .291-.092.529-.275.712l-9.2 9.2c-.1.1-.208.17-.325.212a1.106 1.106 0 0 1-.375.063Z"
    })
  });
}
;
CheckIcon.displayName = "CheckIcon";
module.exports = React.forwardRef(CheckIcon);