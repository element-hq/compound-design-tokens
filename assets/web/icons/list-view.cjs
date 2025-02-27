var _reactJsxRuntime = require("react/jsx-runtime");
var React = require("react");
function ListViewIcon(props, ref) {
  return /*#__PURE__*/_reactJsxRuntime.jsxs("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    fill: "currentColor",
    viewBox: "0 0 24 24",
    ref: ref,
    ...props,
    children: [/*#__PURE__*/_reactJsxRuntime.jsx("path", {
      d: "M17 5a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2z"
    }), /*#__PURE__*/_reactJsxRuntime.jsx("path", {
      fillRule: "evenodd",
      d: "M4 7a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zm8 2H4v6h8z",
      clipRule: "evenodd"
    }), /*#__PURE__*/_reactJsxRuntime.jsx("path", {
      d: "M16 10a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1m0 4a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1m1 3a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2z"
    })]
  });
}
;
ListViewIcon.displayName = "ListViewIcon";
module.exports = React.forwardRef(ListViewIcon);