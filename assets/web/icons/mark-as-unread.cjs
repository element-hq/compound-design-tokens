var _reactJsxRuntime = require("react/jsx-runtime");
var React = require("react");
function MarkAsUnreadIcon(props, ref) {
  return /*#__PURE__*/_reactJsxRuntime.jsxs("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    fill: "currentColor",
    viewBox: "0 0 24 24",
    ref: ref,
    ...props,
    children: [/*#__PURE__*/_reactJsxRuntime.jsx("path", {
      d: "M20 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4"
    }), /*#__PURE__*/_reactJsxRuntime.jsx("path", {
      fillRule: "evenodd",
      d: "M17 5H5a2 2 0 0 0-2 2v10.4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7.83a3 3 0 0 1-2 0q-.316-.113-.595-.288L12 11.89 5 7.138V7h12.764A3 3 0 0 1 17 5m-4.438 8.927L19 9.555V17.4H5V9.555l6.438 4.372a1 1 0 0 0 1.124 0",
      clipRule: "evenodd"
    })]
  });
}
;
MarkAsUnreadIcon.displayName = "MarkAsUnreadIcon";
module.exports = React.forwardRef(MarkAsUnreadIcon);