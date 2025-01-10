var _reactJsxRuntime = require("react/jsx-runtime");
var React = require("react");
function MarkThreadsAsReadIcon(props, ref) {
  return /*#__PURE__*/_reactJsxRuntime.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    fill: "currentColor",
    viewBox: "0 0 24 24",
    ref: ref,
    ...props,
    children: /*#__PURE__*/_reactJsxRuntime.jsx("path", {
      d: "M4 5a1 1 0 0 0 0 2h16a1 1 0 1 0 0-2zm0 5a1 1 0 1 0 0 2h16a1 1 0 1 0 0-2zm-1 6a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1m18.707-.293a1 1 0 0 0-1.414-1.414L17 17.586l-1.293-1.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0z"
    })
  });
}
;
MarkThreadsAsReadIcon.displayName = "MarkThreadsAsReadIcon";
module.exports = React.forwardRef(MarkThreadsAsReadIcon);