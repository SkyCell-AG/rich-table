"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DroppableCell = _interopRequireDefault(require("../DroppableCell"));

var _DraggableCell = _interopRequireDefault(require("../DraggableCell"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  className: _propTypes.default.string,
  onDrop: _propTypes.default.func.isRequired,
  type: _propTypes.default.string.isRequired,
  id: _propTypes.default.string.isRequired,
  children: _propTypes.default.element.isRequired
};
var defaultProps = {
  className: ''
};

var DndCell = function DndCell(_ref) {
  var className = _ref.className,
      onDrop = _ref.onDrop,
      type = _ref.type,
      id = _ref.id,
      children = _ref.children;
  return /*#__PURE__*/_react.default.createElement(_DroppableCell.default, {
    className: className,
    onDrop: onDrop,
    accept: type,
    id: id
  }, /*#__PURE__*/_react.default.createElement(_DraggableCell.default, {
    id: id,
    type: type
  }, children));
};

DndCell.propTypes = propTypes;
DndCell.defaultProps = defaultProps;
var _default = DndCell;
exports.default = _default;