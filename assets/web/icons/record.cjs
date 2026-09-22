var _reactJsxRuntime = require("react/jsx-runtime");
var React = require("react");
function RecordIcon(props, ref) {
  return /*#__PURE__*/_reactJsxRuntime.jsxs("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    fill: "currentColor",
    viewBox: "0 0 24 24",
    ref: ref,
    ...props,
    children: [/*#__PURE__*/_reactJsxRuntime.jsx("path", {
      d: "M12 6a6 6 0 1 1 0 12 6 6 0 0 1 0-12"
    }), /*#__PURE__*/_reactJsxRuntime.jsx("path", {
      fillRule: "evenodd",
      d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16",
      clipRule: "evenodd"
    })]
  });
}
;
RecordIcon.displayName = "RecordIcon";
module.exports = React.forwardRef(RecordIcon);