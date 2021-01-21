"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _memoize = _interopRequireDefault(require("lodash/memoize"));

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _omit = _interopRequireDefault(require("lodash/omit"));

var _uuid = require("uuid");

var _createReducer2 = _interopRequireDefault(require("utils/createReducer"));

var _generateFilters = _interopRequireDefault(require("utils/generateFilters"));

var _useVisible3 = _interopRequireDefault(require("./hooks/useVisible"));

var _useSequence3 = _interopRequireDefault(require("./hooks/useSequence"));

var _useFilter3 = _interopRequireDefault(require("./hooks/useFilter"));

var _useSort3 = _interopRequireDefault(require("./hooks/useSort"));

var _useShowSelectedRows = _interopRequireDefault(require("./hooks/useShowSelectedRows"));

var _RichTable = _interopRequireDefault(require("./RichTable"));

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

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SET_MATCHED_RESULTS = 'SET_MATCHED_RESULTS';
var RERENDER_INFINIT_LIST = 'RERENDER_INFINIT_LIST';
var initState = {
  matchedResults: 0,
  infinitListKey: (0, _uuid.v1)()
};
var reducer = (0, _createReducer2.default)((_createReducer = {}, _defineProperty(_createReducer, RERENDER_INFINIT_LIST, function (state) {
  return _objectSpread(_objectSpread({}, state), {}, {
    infinitListKey: (0, _uuid.v1)()
  });
}), _defineProperty(_createReducer, SET_MATCHED_RESULTS, function (state, _ref) {
  var matchedResults = _ref.meta.matchedResults;
  return _objectSpread(_objectSpread({}, state), {}, {
    matchedResults: matchedResults
  });
}), _createReducer));
var propTypes = {
  uniqField: _propTypes.default.string,
  visible: _propTypes.default.arrayOf(_propTypes.default.string),
  selectedRows: _propTypes.default.arrayOf(_propTypes.default.string),
  onSelectRow: _propTypes.default.func,
  load: _propTypes.default.func.isRequired,
  name: _propTypes.default.string.isRequired,
  onFilterChange: _propTypes.default.func,
  selectedFilter: _propTypes.default.object,
  // eslint-disable-line
  filter: _propTypes.default.object,
  // eslint-disable-line
  sort: _propTypes.default.object,
  // eslint-disable-line
  columns: _propTypes.default.arrayOf(_propTypes.default.shape({
    props: _propTypes.default.object // eslint-disable-line

  })).isRequired
};
var defaultProps = {
  sort: {},
  visible: [],
  filter: {},
  uniqField: 'id',
  onSelectRow: undefined,
  onFilterChange: undefined,
  selectedRows: undefined
};
var generateParams = (0, _memoize.default)(function (filter, sort) {
  var params = {};

  if (!(0, _isEmpty.default)(filter)) {
    params.filter = filter;
  }

  if (!(0, _isEmpty.default)(sort)) {
    params.sort = sort;
  }

  return params;
}, function () {
  for (var _len = arguments.length, data = new Array(_len), _key = 0; _key < _len; _key++) {
    data[_key] = arguments[_key];
  }

  return JSON.stringify(data);
});

var RichTableContainer = function RichTableContainer(_ref2) {
  var outColumns = _ref2.columns,
      load = _ref2.load,
      name = _ref2.name,
      selectedRows = _ref2.selectedRows,
      predefinedVisible = _ref2.visible,
      predefinedSort = _ref2.sort,
      predefinedFilter = _ref2.filter,
      onSelectRow = _ref2.onSelectRow,
      uniqField = _ref2.uniqField,
      props = _objectWithoutProperties(_ref2, ["columns", "load", "name", "selectedRows", "visible", "sort", "filter", "onSelectRow", "uniqField"]);

  var _useReducer = (0, _react.useReducer)(reducer, _objectSpread({}, initState)),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      _useReducer2$ = _useReducer2[0],
      matchedResults = _useReducer2$.matchedResults,
      infinitListKey = _useReducer2$.infinitListKey,
      dispatch = _useReducer2[1];

  var typeMapping = (0, _react.useMemo)(function () {
    return outColumns.reduce(function (prev, _ref3) {
      var filterField = _ref3.filterField,
          filterType = _ref3.filterType;

      if (!filterField) {
        return prev;
      }

      return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, filterField, filterType));
    }, {});
  }, [outColumns]);
  var columns = (0, _react.useMemo)(function () {
    return outColumns.map(function (column) {
      var mapHeaderProps = column.mapHeaderProps,
          headerProps = column.headerProps;

      if (headerProps) {
        return _objectSpread(_objectSpread({}, column), {}, {
          label: headerProps.children
        });
      }

      if (mapHeaderProps) {
        return _objectSpread(_objectSpread({}, column), {}, {
          label: mapHeaderProps().children
        });
      }

      return _objectSpread(_objectSpread({}, column), {}, {
        label: ''
      });
    });
  }, [outColumns]);

  var _useSequence = (0, _useSequence3.default)(columns),
      _useSequence2 = _slicedToArray(_useSequence, 2),
      sequence = _useSequence2[0],
      changeSequence = _useSequence2[1];

  var _useVisible = (0, _useVisible3.default)(columns, predefinedVisible),
      _useVisible2 = _slicedToArray(_useVisible, 2),
      visible = _useVisible2[0],
      setVisible = _useVisible2[1];

  var _useFilter = (0, _useFilter3.default)(predefinedFilter),
      _useFilter2 = _slicedToArray(_useFilter, 3),
      filter = _useFilter2[0],
      setFilter = _useFilter2[1],
      removeFilter = _useFilter2[2];

  var _useSort = (0, _useSort3.default)(predefinedSort),
      _useSort2 = _slicedToArray(_useSort, 3),
      sort = _useSort2[0],
      setSorting = _useSort2[1],
      removeSort = _useSort2[2];

  var loadParams = (0, _react.useCallback)(function () {
    return generateParams(filter, sort)();
  }, [filter, sort]);
  var loadWithParams = (0, _react.useCallback)(function (page) {
    return load(_objectSpread(_objectSpread({}, loadParams), {}, {
      typeMapping: typeMapping,
      page: page
    })).catch(function (err) {
      // eslint-disable-next-line no-console, max-len
      console.error(err); // TODO: without catch handler catch handler in InfinitListContainer doesn't fire
    });
  }, [load, loadParams, typeMapping]);
  var setMatchedResults = (0, _react.useCallback)(function (newMatchedResults) {
    dispatch({
      type: SET_MATCHED_RESULTS,
      meta: {
        matchedResults: newMatchedResults
      }
    });
  }, [dispatch]);
  var rerenderInfinitList = (0, _react.useCallback)(function () {
    dispatch({
      type: RERENDER_INFINIT_LIST
    });
  }, [dispatch]);
  var createFilterHandler = (0, _react.useCallback)(function (columnId) {
    return function (value) {
      setFilter(columnId, value);
    };
  }, [setFilter]);
  var visibleAndSortedColumns = sequence.filter(function (columnId) {
    return visible.includes(columnId);
  }).map(function (columnId) {
    return columns.find(function (_ref4) {
      var id = _ref4.id;
      return id === columnId;
    });
  }).filter(Boolean).map(function (column) {
    var _props;

    var appliedFilters = (0, _generateFilters.default)((0, _omit.default)(filter, [column.filterField]), typeMapping);
    return _objectSpread(_objectSpread({}, column), {}, {
      props: (_props = {
        appliedFilters: appliedFilters,
        filter: filter[column.filterField],
        predefinedFilter: predefinedFilter,
        setFilter: createFilterHandler(column.filterField || column.id)
      }, _defineProperty(_props, sort.field === column.id && 'sortDirection', sort.direction), _defineProperty(_props, "sort", function sort(direction) {
        setSorting(column.id, direction);
      }), _props)
    });
  });
  var visibleAndSortedColumnsWithSelection = (0, _useShowSelectedRows.default)({
    columns: visibleAndSortedColumns,
    onSelect: onSelectRow,
    selected: selectedRows,
    uniqField: uniqField
  });
  return /*#__PURE__*/_react.default.createElement(_RichTable.default, _extends({}, props, {
    load: loadWithParams,
    name: name,
    removeFilter: removeFilter,
    infinitListKey: infinitListKey,
    rerenderInfinitList: rerenderInfinitList,
    removeSort: removeSort,
    setMatchedResults: setMatchedResults,
    matchedResults: matchedResults,
    changeSequence: changeSequence,
    visible: visible,
    setVisible: setVisible,
    allColumns: columns,
    selectedRows: selectedRows,
    columns: visibleAndSortedColumnsWithSelection,
    uniqField: uniqField
  }));
};

RichTableContainer.propTypes = propTypes;
RichTableContainer.defaultProps = defaultProps;
var _default = RichTableContainer;
exports.default = _default;