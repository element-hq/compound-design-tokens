var _reactJsxRuntime = require("react/jsx-runtime");
var React = require("react");
function QrCodeIcon(props, ref) {
  return /*#__PURE__*/_reactJsxRuntime.jsxs("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    fill: "currentColor",
    ref: ref,
    ...props,
    children: [/*#__PURE__*/_reactJsxRuntime.jsx("path", {
      fillRule: "evenodd",
      d: "M3 4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1zm2 5V5h4v4zm-2 5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1zm2 5v-4h4v4zm9-16a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm1 2v4h4V5z",
      clipRule: "evenodd"
    }), /*#__PURE__*/_reactJsxRuntime.jsx("path", {
      d: "M15 16v-3h-2v3z"
    }), /*#__PURE__*/_reactJsxRuntime.jsx("path", {
      d: "M17 16h-2v2h-2v3h2v-3h2v2h4v-2h-2v-5h-2z"
    })]
  });
}
;
QrCodeIcon.displayName = "QrCodeIcon";
module.exports = React.forwardRef(QrCodeIcon);