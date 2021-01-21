"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _BaseCell = _interopRequireDefault(require("./BaseCell.style"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  children: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.string, _propTypes.default.number, _propTypes.default.arrayOf(_propTypes.default.element)]),
  className: _propTypes.default.string
};
var defaultProps = {
  className: '',
  children: null
};

var BaseCell = function BaseCell(_ref) {
  var children = _ref.children,
      className = _ref.className;
  var classes = (0, _BaseCell.default)();
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _clsx.default)(classes.wrapper, className)
  }, children);
};

BaseCell.propTypes = propTypes;
BaseCell.defaultProps = defaultProps;
var _default = BaseCell;
exports.default = _default;