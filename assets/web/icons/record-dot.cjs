var _reactJsxRuntime = require("react/jsx-runtime");
var React = require("react");
function RecordDotIcon(props, ref) {
  return /*#__PURE__*/_reactJsxRuntime.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    fill: "currentColor",
    viewBox: "0 0 24 24",
    ref: ref,
    ...props,
    children: /*#__PURE__*/_reactJsxRuntime.jsx("path", {
      d: "M18 12a6 6 0 1 1-12 0 6 6 0 0 1 12 0"
    })
  });
}
;
RecordDotIcon.displayName = "RecordDotIcon";
module.exports = React.forwardRef(RecordDotIcon);