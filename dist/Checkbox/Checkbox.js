"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _noop = _interopRequireDefault(require("lodash/noop"));

var _core = require("@material-ui/core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var propTypes = {
  title: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  indeterminate: _propTypes.default.bool,
  onChange: _propTypes.default.func,
  name: _propTypes.default.string,
  value: _propTypes.default.bool,
  className: _propTypes.default.string
};
var defaultProps = {
  title: '',
  disabled: false,
  indeterminate: false,
  onChange: _noop.default,
  name: '',
  value: false,
  className: ''
};

var Checkbox = function Checkbox(_ref) {
  var title = _ref.title,
      disabled = _ref.disabled,
      indeterminate = _ref.indeterminate,
      onChange = _ref.onChange,
      name = _ref.name,
      value = _ref.value,
      className = _ref.className;
  var handleChange = (0, _react.useCallback)(function () {
    var newValue = !value;
    onChange(newValue, {
      target: {
        name: name,
        value: newValue
      }
    });
  }, [name, onChange, value]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: className
  }, /*#__PURE__*/_react.default.createElement(_core.FormControlLabel, {
    control: /*#__PURE__*/_react.default.createElement(_core.Checkbox, {
      disabled: disabled,
      checked: value,
      color: "primary",
      indeterminate: indeterminate,
      onChange: handleChange,
      value: value,
      name: name
    }),
    label: title
  }));
};

Checkbox.propTypes = propTypes;
Checkbox.defaultProps = defaultProps;
var _default = Checkbox;
exports.default = _default;