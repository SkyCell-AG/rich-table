"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _createReducer2 = _interopRequireDefault(require("utils/createReducer"));

var _removeEmptyFields = _interopRequireDefault(require("utils/removeEmptyFields"));

var _createReducer;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var UPDATE_FILTER = 'UPDATE_FILTER';
var SET_FILTER = 'SET_FILTER';
var REMOVE_FILTER = 'REMOVE_FILTER';
var initState = {
  filter: {},
  predefinedFilter: {}
};
var reducer = (0, _createReducer2.default)((_createReducer = {}, _defineProperty(_createReducer, REMOVE_FILTER, function (_ref) {
  var predefinedFilter = _ref.predefinedFilter;
  return _objectSpread(_objectSpread({}, initState), {}, {
    filter: predefinedFilter,
    predefinedFilter: predefinedFilter
  });
}), _defineProperty(_createReducer, UPDATE_FILTER, function (state, _ref2) {
  var filter = _ref2.meta.filter;
  return _objectSpread(_objectSpread({}, state), {}, {
    filter: filter,
    predefinedFilter: filter
  });
}), _defineProperty(_createReducer, SET_FILTER, function (state, _ref3) {
  var _ref3$meta = _ref3.meta,
      column = _ref3$meta.column,
      value = _ref3$meta.value;
  return _objectSpread(_objectSpread({}, state), {}, {
    filter: (0, _removeEmptyFields.default)(_objectSpread(_objectSpread({}, state.filter), {}, _defineProperty({}, column, value)))
  });
}), _createReducer));

var useFilter = function useFilter(filterOut) {
  var _useReducer = (0, _react.useReducer)(reducer, {
    filter: filterOut,
    predefinedFilter: filterOut
  }),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      _useReducer2$ = _useReducer2[0],
      filter = _useReducer2$.filter,
      predefinedFilter = _useReducer2$.predefinedFilter,
      dispatch = _useReducer2[1];

  (0, _react.useEffect)(function () {
    if (predefinedFilter !== filterOut) {
      dispatch({
        type: UPDATE_FILTER,
        meta: {
          filter: filterOut
        }
      });
    }
  }, [predefinedFilter, filterOut]);
  var setFilter = (0, _react.useCallback)(function (column, value) {
    dispatch({
      type: SET_FILTER,
      meta: {
        column: column,
        value: value
      }
    });
  }, [dispatch]);
  var removeFilter = (0, _react.useCallback)(function () {
    dispatch({
      type: REMOVE_FILTER
    });
  }, []);
  return [filter, setFilter, removeFilter];
};

var _default = useFilter;
exports.default = _default;