"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Popover = _interopRequireDefault(require("@material-ui/core/Popover"));

var _clsx2 = _interopRequireDefault(require("clsx"));

var _get = _interopRequireDefault(require("lodash/get"));

var _FilterIcon = _interopRequireDefault(require("../FilterIcon"));

var _FilterPopoverModule = _interopRequireDefault(require("./FilterPopover.module.css"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var propTypes = {
  button: _propTypes.default.element,
  children: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.string]).isRequired,
  opened: _propTypes.default.bool.isRequired,
  close: _propTypes.default.func.isRequired,
  active: _propTypes.default.bool,
  open: _propTypes.default.func.isRequired,
  className: _propTypes.default.string
};
var defaultProps = {
  active: false,
  className: '',
  button: null
};
var transformOrigin = {
  vertical: 'top',
  horizontal: 'center'
};
var anchorOrigin = {
  vertical: 'bottom',
  horizontal: 'center'
};

var FilterPopover = function FilterPopover(props) {
  var children = props.children,
      open = props.open,
      close = props.close,
      opened = props.opened,
      active = props.active,
      className = props.className,
      button = props.button;
  var filterIcon = (0, _react.useRef)(null);
  var id = 'simple-popover';
  var dataTestId = (0, _get.default)(props, 'data-testid');
  return /*#__PURE__*/_react.default.createElement("div", {
    className: className
  }, /*#__PURE__*/_react.default.createElement("div", {
    "data-testid": dataTestId,
    ref: filterIcon,
    "aria-describedby": id,
    className: (0, _clsx2.default)('cursor-pointer', _FilterPopoverModule.default.buttonWrapper, _defineProperty({}, _FilterPopoverModule.default.active, opened || active)),
    onKeyDown: open,
    onClick: open,
    id: id
  }, button || /*#__PURE__*/_react.default.createElement(_FilterIcon.default, null)), /*#__PURE__*/_react.default.createElement(_Popover.default, {
    id: id,
    open: opened,
    anchorEl: filterIcon.current,
    onClose: close,
    anchorOrigin: anchorOrigin,
    transformOrigin: transformOrigin
  }, children));
};

FilterPopover.propTypes = propTypes;
FilterPopover.defaultProps = defaultProps;
var _default = FilterPopover;
exports.default = _default;