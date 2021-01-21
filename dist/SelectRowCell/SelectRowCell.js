"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Checkbox = _interopRequireDefault(require("../Checkbox"));

var _SelectRowCellModule = _interopRequireDefault(require("./SelectRowCell.module.css"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  checked: _propTypes.default.bool,
  indeterminate: _propTypes.default.bool,
  onChange: _propTypes.default.func.isRequired
};
var defaultProps = {
  checked: false,
  indeterminate: false
};

var SelectRowCell = function SelectRowCell(_ref) {
  var _ref$checked = _ref.checked,
      checked = _ref$checked === void 0 ? false : _ref$checked,
      indeterminate = _ref.indeterminate,
      onChange = _ref.onChange;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: _SelectRowCellModule.default.wrapper
  }, /*#__PURE__*/_react.default.createElement(_Checkbox.default, {
    value: checked,
    indeterminate: indeterminate,
    onChange: onChange
  }));
};

SelectRowCell.propTypes = propTypes;
SelectRowCell.defaultProps = defaultProps;
var _default = SelectRowCell;
exports.default = _default;