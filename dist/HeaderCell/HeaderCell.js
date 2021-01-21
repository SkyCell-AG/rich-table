"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _styles = require("@material-ui/core/styles");

var _Filter = _interopRequireDefault(require("Filter"));

var _sortDirection = require("utils/sortDirection");

var _BaseCell = _interopRequireDefault(require("BaseCell"));

var _SortIcons = _interopRequireDefault(require("./SortIcons"));

var _HeaderCell = _interopRequireDefault(require("./HeaderCell.style"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var propTypes = {
  loadFilters: _propTypes.default.func,
  id: _propTypes.default.string.isRequired,
  setFilter: _propTypes.default.func.isRequired,
  children: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.string]),
  appliedFilters: _propTypes.default.object,
  // eslint-disable-line
  FilterComponent: _propTypes.default.func,
  className: _propTypes.default.string,
  sorting: _propTypes.default.bool,
  sortDirection: _propTypes.default.string,
  sort: _propTypes.default.func
};
var defaultProps = {
  className: '',
  children: undefined,
  loadFilters: null,
  appliedFilters: null,
  FilterComponent: _Filter.default,
  sorting: true,
  sortDirection: '',
  sort: function sort() {}
};

var HeaderCell = function HeaderCell(props) {
  var children = props.children,
      className = props.className,
      sortDirection = props.sortDirection,
      loadFilters = props.loadFilters,
      id = props.id,
      setFilter = props.setFilter,
      appliedFilters = props.appliedFilters,
      FilterComponent = props.FilterComponent,
      sorting = props.sorting,
      sort = props.sort;
  var theme = (0, _styles.useTheme)();
  var classes = (0, _HeaderCell.default)(theme);
  var loadFiltersWithArgs = (0, _react.useCallback)(function () {
    return loadFilters(appliedFilters);
  }, [loadFilters, appliedFilters]);
  var handleSorting = (0, _react.useCallback)(function () {
    if (!sorting) return null;

    switch (sortDirection) {
      case _sortDirection.ASC:
        sort(_sortDirection.DESC);
        break;

      case _sortDirection.DESC:
        sort();
        break;

      default:
        sort(_sortDirection.ASC);
    }

    return null;
  }, [sortDirection, sort, sorting]);
  return /*#__PURE__*/_react.default.createElement(_BaseCell.default, _extends({}, props, {
    className: (0, _clsx.default)(className, classes.root)
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: classes.btn
  }, /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    onClick: handleSorting
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: classes.buttonFont
  }, children))), /*#__PURE__*/_react.default.createElement("div", {
    className: classes.controls
  }, loadFilters && /*#__PURE__*/_react.default.createElement(FilterComponent, _extends({}, props, {
    id: id,
    loadFilters: loadFiltersWithArgs,
    set: setFilter
  })), sorting && /*#__PURE__*/_react.default.createElement(_SortIcons.default, {
    className: classes.icon,
    value: sortDirection
  })));
};

HeaderCell.propTypes = propTypes;
HeaderCell.defaultProps = defaultProps;
var _default = HeaderCell;
exports.default = _default;