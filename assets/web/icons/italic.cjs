var _reactJsxRuntime = require("react/jsx-runtime");
var React = require("react");
function ItalicIcon(props, ref) {
  return /*#__PURE__*/_reactJsxRuntime.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    fill: "currentColor",
    viewBox: "0 0 24 24",
    ref: ref,
    ...props,
    children: /*#__PURE__*/_reactJsxRuntime.jsx("path", {
      d: "M6.25 19c-.35 0-.646-.12-.888-.363A1.207 1.207 0 0 1 5 17.75c0-.35.12-.646.362-.887.242-.242.538-.363.888-.363H9l3-9H9.25c-.35 0-.646-.12-.887-.362A1.207 1.207 0 0 1 8 6.25c0-.35.12-.646.363-.888A1.21 1.21 0 0 1 9.25 5h7.5c.35 0 .646.12.887.362.242.242.363.538.363.888s-.12.646-.363.888a1.207 1.207 0 0 1-.887.362H14.5l-3 9h2.25c.35 0 .646.12.887.363.242.241.363.537.363.887s-.12.646-.363.887a1.207 1.207 0 0 1-.887.363h-7.5Z"
    })
  });
}
;
ItalicIcon.displayName = "ItalicIcon";
module.exports = React.forwardRef(ItalicIcon);