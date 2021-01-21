"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _ArrowUpward = _interopRequireDefault(require("@material-ui/icons/ArrowUpward"));

var _ArrowDownward = _interopRequireDefault(require("@material-ui/icons/ArrowDownward"));

var _sortDirection = require("utils/sortDirection");

var _SortIconsModule = _interopRequireDefault(require("./SortIcons.module.css"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  value: _propTypes.default.oneOf([_sortDirection.ASC, _sortDirection.DESC, '']),
  className: _propTypes.default.string
};
var defaultProps = {
  value: '',
  className: ''
};

var SortIcons = function SortIcons(_ref) {
  var value = _ref.value,
      className = _ref.className;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: _SortIconsModule.default.root
  }, !value && /*#__PURE__*/_react.default.createElement(_ArrowUpward.default, {
    className: (0, _clsx.default)(['text-4xl', _SortIconsModule.default.arrow, className]),
    color: "disabled"
  }), value === _sortDirection.ASC && /*#__PURE__*/_react.default.createElement(_ArrowUpward.default, {
    className: (0, _clsx.default)(['text-4xl', _SortIconsModule.default.arrow]),
    color: "inherit"
  }), value === _sortDirection.DESC && /*#__PURE__*/_react.default.createElement(_ArrowDownward.default, {
    className: (0, _clsx.default)(['text-4xl', _SortIconsModule.default.arrow]),
    color: "inherit"
  }));
};

SortIcons.propTypes = propTypes;
SortIcons.defaultProps = defaultProps;
var _default = SortIcons;
exports.default = _default;