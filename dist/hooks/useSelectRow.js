"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _createReducer2 = _interopRequireDefault(require("app/utils/createReducer"));

var _SelectRowCell = _interopRequireDefault(require("../SelectRowCell"));

var _createReducer;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SELECT_ALL = 'SELECT_ALL';
var SELECT = 'SELECT';
var initState = {
  allSelected: false,
  selected: {}
};
var reducer = (0, _createReducer2.default)((_createReducer = {}, _defineProperty(_createReducer, SELECT, function (state, _ref) {
  var _ref$meta = _ref.meta,
      id = _ref$meta.id,
      value = _ref$meta.value;
  return _objectSpread(_objectSpread({}, state), {}, {
    allSelected: false,
    selected: _objectSpread(_objectSpread({}, state.selected), {}, _defineProperty({}, id, value))
  });
}), _defineProperty(_createReducer, SELECT_ALL, function (state, _ref2) {
  var value = _ref2.meta.value;
  return _objectSpread(_objectSpread({}, state), {}, {
    selected: {},
    allSelected: value
  });
}), _createReducer));

var useSelectRow = function useSelectRow(onSelectRow, columns) {
  var _useReducer = (0, _react.useReducer)(reducer, initState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      _useReducer2$ = _useReducer2[0],
      selected = _useReducer2$.selected,
      allSelected = _useReducer2$.allSelected,
      dispatch = _useReducer2[1];

  var select = (0, _react.useCallback)(function (id, value) {
    dispatch({
      type: SELECT,
      meta: {
        value: value,
        id: id
      }
    });
  }, [dispatch]);
  var selectAll = (0, _react.useCallback)(function (value) {
    dispatch({
      type: SELECT_ALL,
      meta: {
        value: value
      }
    });
  }, []);
  (0, _react.useEffect)(function () {
    if (!onSelectRow) {
      return;
    }

    if (allSelected) {
      onSelectRow('ALL');
      return;
    }

    onSelectRow(Object.entries(selected).filter(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 1),
          value = _ref4[0];

      return value;
    }).map(function (_ref5) {
      var _ref6 = _slicedToArray(_ref5, 1),
          key = _ref6[0];

      return key;
    }));
  }, [selected, allSelected, onSelectRow]);
  var selectRowHandler = (0, _react.useCallback)(function (rowId) {
    return function (value) {
      select(rowId, value);
    };
  }, [select]);
  return onSelectRow ? [selected, [{
    id: 'Select',
    Header: _SelectRowCell.default,
    mapHeaderProps: function mapHeaderProps() {
      return {
        onChange: selectAll,
        checked: allSelected,
        indeterminate: allSelected ? false : Object.values(selected).find(Boolean)
      };
    },
    Cell: _SelectRowCell.default,
    mapCellProps: function mapCellProps(_ref7) {
      var id = _ref7.id;
      var selectedRow = allSelected ? false : selected[id];
      return {
        onChange: selectRowHandler(id),
        indeterminate: allSelected,
        checked: selectedRow,
        selectedRow: selectedRow
      };
    }
  }].concat(_toConsumableArray(columns))] : [{}, columns];
};

var _default = useSelectRow;
exports.default = _default;