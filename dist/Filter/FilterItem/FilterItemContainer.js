"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _FilterItem = _interopRequireDefault(require("./FilterItem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FilterItemContainer = function FilterItemContainer(props) {
  return /*#__PURE__*/_react.default.createElement(_FilterItem.default, props);
};

var _default = FilterItemContainer;
exports.default = _default;