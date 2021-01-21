"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ListItem = _interopRequireDefault(require("@material-ui/core/ListItem"));

var _Chip = _interopRequireDefault(require("@material-ui/core/Chip"));

var _Checkbox = _interopRequireDefault(require("Checkbox"));

var _FilterItem = _interopRequireDefault(require("./FilterItem.styles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  label: _propTypes.default.string.isRequired,
  value: _propTypes.default.string.isRequired,
  count: _propTypes.default.number.isRequired,
  checked: _propTypes.default.bool.isRequired,
  onClick: _propTypes.default.func.isRequired,
  disabled: _propTypes.default.bool.isRequired
};

var FilterItem = function FilterItem(props) {
  var count = props.count,
      label = props.label,
      value = props.value,
      checked = props.checked,
      disabled = props.disabled,
      onClick = props.onClick;
  var classes = (0, _FilterItem.default)();
  return /*#__PURE__*/_react.default.createElement(_ListItem.default, {
    key: value,
    button: true,
    disabled: disabled,
    className: classes.root,
    onClick: onClick
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: classes.labelCheckbox
  }, /*#__PURE__*/_react.default.createElement(_Checkbox.default, {
    value: checked,
    title: label === undefined ? value : label,
    disabled: disabled
  })), count && /*#__PURE__*/_react.default.createElement(_Chip.default, {
    label: count,
    size: "small"
  }));
};

FilterItem.propTypes = propTypes;
var _default = FilterItem;
exports.default = _default;