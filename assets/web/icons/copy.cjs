var _reactJsxRuntime = require("react/jsx-runtime");
var React = require("react");
function CopyIcon(props, ref) {
  return /*#__PURE__*/_reactJsxRuntime.jsxs("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    fill: "currentColor",
    viewBox: "0 0 24 24",
    ref: ref,
    ...props,
    children: [/*#__PURE__*/_reactJsxRuntime.jsx("path", {
      d: "M14 5H5v9h1a1 1 0 1 1 0 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1a1 1 0 1 1-2 0z"
    }), /*#__PURE__*/_reactJsxRuntime.jsx("path", {
      d: "M8 10a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2zm2 0v9h9v-9z"
    })]
  });
}
;
CopyIcon.displayName = "CopyIcon";
module.exports = React.forwardRef(CopyIcon);