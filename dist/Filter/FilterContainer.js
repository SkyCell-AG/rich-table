"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _createReducer2 = _interopRequireDefault(require("utils/createReducer"));

var statuses = _interopRequireWildcard(require("utils/requestStatuses"));

var _generateAsyncActions = _interopRequireDefault(require("utils/generateAsyncActions"));

var _Filter = _interopRequireDefault(require("./Filter"));

var _createReducer;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var INPUT_SEARCH_PHRASE = 'INPUT_SEARCH_PHRASE';
var LOAD_FILTERS = (0, _generateAsyncActions.default)('LOAD_FILTERS');
var reducer = (0, _createReducer2.default)((_createReducer = {}, _defineProperty(_createReducer, INPUT_SEARCH_PHRASE, function (state, _ref) {
  var searchPhrase = _ref.meta.searchPhrase;
  return _objectSpread(_objectSpread({}, state), {}, {
    searchPhrase: searchPhrase
  });
}), _defineProperty(_createReducer, LOAD_FILTERS.pending, function (state) {
  return _objectSpread(_objectSpread({}, state), {}, {
    status: statuses.PENDING
  });
}), _defineProperty(_createReducer, LOAD_FILTERS.failure, function (state, _ref2) {
  var err = _ref2.err;
  return _objectSpread(_objectSpread({}, state), {}, {
    status: statuses.FAILURE,
    err: err
  });
}), _defineProperty(_createReducer, LOAD_FILTERS.success, function (state, _ref3) {
  var payload = _ref3.payload;
  return _objectSpread(_objectSpread({}, state), {}, {
    status: statuses.SUCCESS,
    filters: payload
  });
}), _createReducer));
var initState = {
  status: statuses.PRISTIN,
  err: null,
  filters: [],
  searchPhrase: ''
};
var propTypes = {
  loadFilters: _propTypes.default.func.isRequired
};

var FilterContainer = function FilterContainer(props) {
  var loadFilters = props.loadFilters;

  var _useReducer = (0, _react.useReducer)(reducer, initState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  var setSearchPhrase = (0, _react.useCallback)(function (searchPhrase) {
    dispatch({
      type: INPUT_SEARCH_PHRASE,
      meta: {
        searchPhrase: searchPhrase
      }
    });
  }, []);
  var load = (0, _react.useCallback)(function () {
    dispatch({
      type: LOAD_FILTERS.pending
    });
    loadFilters().then(function (data) {
      dispatch({
        type: LOAD_FILTERS.success,
        payload: data
      });
    }).catch(function (err) {
      dispatch({
        type: LOAD_FILTERS.failure,
        err: err
      });
    });
  }, [loadFilters]);
  return /*#__PURE__*/_react.default.createElement(_Filter.default, _extends({}, props, {
    searchPhrase: state.searchPhrase,
    setSearchPhrase: setSearchPhrase,
    status: state.status,
    filters: state.filters,
    load: load
  }));
};

FilterContainer.propTypes = propTypes;
var _default = FilterContainer;
exports.default = _default;