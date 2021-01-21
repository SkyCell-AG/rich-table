"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _get = _interopRequireDefault(require("lodash/get"));

var _SelectRowCell = _interopRequireDefault(require("../SelectRowCell"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var useShowSelectedRows = function useShowSelectedRows(_ref) {
  var columns = _ref.columns,
      onSelect = _ref.onSelect,
      selected = _ref.selected,
      uniqField = _ref.uniqField;
  var selectRowHandler = (0, _react.useCallback)(function (id) {
    return function (checked) {
      if (!checked) {
        onSelect(selected.filter(function (selectedId) {
          return id !== selectedId;
        }));
        return;
      }

      onSelect([].concat(_toConsumableArray(selected), [id]));
    };
  }, [onSelect, selected]);
  var columsWithSelect = (0, _react.useMemo)(function () {
    if (!selected) {
      return columns;
    }

    return [{
      id: 'Select',
      Header: _SelectRowCell.default,
      Cell: _SelectRowCell.default,
      mapCellProps: function mapCellProps(rowProps) {
        var id = (0, _get.default)(rowProps, uniqField);
        var checked = selected.includes(id);
        return {
          onChange: selectRowHandler(id, checked),
          checked: checked,
          selected: selected
        };
      }
    }].concat(_toConsumableArray(columns));
  }, [columns, selectRowHandler, selected, uniqField]);
  return columsWithSelect;
};

var _default = useShowSelectedRows;
exports.default = _default;