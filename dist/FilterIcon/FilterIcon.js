"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("@material-ui/core/styles");

var _clsx = _interopRequireDefault(require("clsx"));

var _SvgIcon = _interopRequireDefault(require("@material-ui/core/SvgIcon"));

var _styles2 = require("@material-ui/styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var useStyles = (0, _styles2.makeStyles)({
  icon: {
    height: '20px !important',
    width: '20px !important'
  }
});

var FilterIcon = function FilterIcon(_ref) {
  var className = _ref.className;
  var theme = (0, _styles.useTheme)();
  var classes = useStyles(theme);
  return /*#__PURE__*/_react.default.createElement(_SvgIcon.default, {
    className: (0, _clsx.default)(classes.icon, className),
    viewBox: "0 0 15 15"
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "M2 2.054464L15.230225 2l-5.132897 4.825055-.123136 8.311554-3.318686-2.544346.142712-5.715111z"
  }));
};

FilterIcon.propTypes = {
  className: _propTypes.default.string
};
FilterIcon.defaultProps = {
  className: ''
};
var _default = FilterIcon;
exports.default = _default;