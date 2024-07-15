var _reactJsxRuntime = require("react/jsx-runtime");
var React = require("react");
function ComposeIcon(props, ref) {
  return /*#__PURE__*/_reactJsxRuntime.jsxs("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    fill: "currentColor",
    viewBox: "0 0 24 24",
    ref: ref,
    ...props,
    children: [/*#__PURE__*/_reactJsxRuntime.jsx("path", {
      fillRule: "evenodd",
      d: "M3 5a2 2 0 0 1 2-2h6a1 1 0 1 1 0 2H5v14h14v-6a1 1 0 1 1 2 0v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5Z",
      clipRule: "evenodd"
    }), /*#__PURE__*/_reactJsxRuntime.jsx("path", {
      d: "m8.023 14.711 1.331-3.992a1 1 0 0 1 1.656-.391l2.662 2.662a1 1 0 0 1-.391 1.655l-3.993 1.331a1 1 0 0 1-1.265-1.265Z"
    }), /*#__PURE__*/_reactJsxRuntime.jsx("path", {
      fillRule: "evenodd",
      d: "M19.765 2.82a2 2 0 0 0-2.828 0L9.866 9.89c-.195.195-.341.42-.439.66a1.024 1.024 0 0 0-.073.168l-1.33 3.992a1 1 0 0 0 1.264 1.265l3.993-1.33c.059-.02.115-.045.167-.074.24-.097.466-.243.66-.438l7.072-7.071a2 2 0 0 0 0-2.829L19.765 2.82Zm-6.717 9.546 6.717-6.718-1.414-1.414-6.717 6.718 1.414 1.414Z",
      clipRule: "evenodd"
    })]
  });
}
;
ComposeIcon.displayName = "ComposeIcon";
module.exports = React.forwardRef(ComposeIcon);