"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx4 = _interopRequireDefault(require("clsx"));

var _noop = _interopRequireDefault(require("lodash/noop"));

var _get = _interopRequireDefault(require("lodash/get"));

var _styles = require("@material-ui/core/styles");

var _getComponentProps = _interopRequireDefault(require("utils/getComponentProps"));

var _BaseCell = _interopRequireDefault(require("./BaseCell"));

var _HeaderCell = _interopRequireDefault(require("./HeaderCell"));

var _InfiniteList = _interopRequireDefault(require("./InfiniteList"));

var _DndCell = _interopRequireDefault(require("./DndCell"));

var _RichTable = _interopRequireDefault(require("./RichTable.style"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var propTypes = {
  uniqField: _propTypes.default.string,
  name: _propTypes.default.string.isRequired,
  visible: _propTypes.default.arrayOf(_propTypes.default.string).isRequired,
  setVisible: _propTypes.default.func.isRequired,
  allColumns: _propTypes.default.arrayOf(_propTypes.default.object).isRequired,
  onRowClick: _propTypes.default.func,
  changeSequence: _propTypes.default.func.isRequired,
  setMatchedResults: _propTypes.default.func.isRequired,
  matchedResults: _propTypes.default.number,
  removeFilter: _propTypes.default.func.isRequired,
  removeSort: _propTypes.default.func.isRequired,
  rerenderInfinitList: _propTypes.default.func.isRequired,
  infinitListKey: _propTypes.default.string.isRequired,
  selectedRows: _propTypes.default.object,
  // eslint-disable-line
  columns: _propTypes.default.arrayOf(_propTypes.default.shape({
    id: _propTypes.default.string.isRequired,
    Header: _propTypes.default.func,
    Cell: _propTypes.default.func,
    props: _propTypes.default.object // eslint-disable-line

  }).isRequired).isRequired,
  className: _propTypes.default.string,
  controlPanel: _propTypes.default.func,
  classNames: _propTypes.default.exact({
    root: _propTypes.default.string,
    contentWrapper: _propTypes.default.string,
    headerWrapper: _propTypes.default.string
  }),
  editing: _propTypes.default.bool,
  selectedRowId: _propTypes.default.string
};
var defaultProps = {
  matchedResults: undefined,
  className: '',
  onRowClick: _noop.default,
  selectedRows: {},
  uniqField: 'id',
  controlPanel: null,
  classNames: {},
  editing: false,
  selectedRowId: ''
};

var RichTable = function RichTable(props) {
  var columns = props.columns,
      wrapperClassName = props.className,
      setMatchedResults = props.setMatchedResults,
      onRowClick = props.onRowClick,
      selectedRows = props.selectedRows,
      infinitListKey = props.infinitListKey,
      rerenderInfinitList = props.rerenderInfinitList,
      changeSequence = props.changeSequence,
      uniqField = props.uniqField,
      ControlPanel = props.controlPanel,
      classNames = props.classNames,
      editing = props.editing,
      selectedRowId = props.selectedRowId,
      name = props.name;
  var theme = (0, _styles.useTheme)();
  var classes = (0, _RichTable.default)(theme, props);
  var rowClick = (0, _react.useCallback)(function (row) {
    return function () {
      onRowClick(row, rerenderInfinitList);
    };
  }, [onRowClick, rerenderInfinitList]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _clsx4.default)(classNames.root, classes.tableWrapper, editing && classes.tableWrapperWhenEditing, wrapperClassName)
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _clsx4.default)(classes.headerTableWrapper, editing && classes.tableWrapperWhenEditing, classNames.headerWrapper)
  }, ControlPanel && /*#__PURE__*/_react.default.createElement(ControlPanel, props)), /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _clsx4.default)(classes.contentWrapper, editing && classes.contentWrapperWhenEditing, classNames.contentWrapper)
  }, /*#__PURE__*/_react.default.createElement(_InfiniteList.default, _extends({}, props, {
    key: infinitListKey,
    onUpdateMatchedResults: setMatchedResults,
    beforeList: /*#__PURE__*/_react.default.createElement("div", {
      className: classes.headings
    }, columns.map(function (_ref) {
      var _ref$Header = _ref.Header,
          Header = _ref$Header === void 0 ? _HeaderCell.default : _ref$Header,
          _ref$mapHeaderProps = _ref.mapHeaderProps,
          mapHeaderProps = _ref$mapHeaderProps === void 0 ? _noop.default : _ref$mapHeaderProps,
          headerPropsOut = _ref.headerProps,
          filterField = _ref.filterField,
          id = _ref.id,
          cellClassName = _ref.className,
          width = _ref.width,
          columnProps = _ref.props,
          rest = _objectWithoutProperties(_ref, ["Header", "mapHeaderProps", "headerProps", "filterField", "id", "className", "width", "props"]);

      var headerProps = headerPropsOut || mapHeaderProps(columnProps);
      return /*#__PURE__*/_react.default.createElement("div", {
        key: "DndCell-".concat(id),
        "data-testid": "table-header-".concat(id),
        className: (0, _clsx4.default)(classes.cell, cellClassName),
        style: {
          width: width
        }
      }, /*#__PURE__*/_react.default.createElement(_DndCell.default, {
        onDrop: changeSequence,
        id: id,
        type: "HeaderCell"
      }, /*#__PURE__*/_react.default.createElement(Header, _extends({}, rest, columnProps, headerProps, {
        key: "header-".concat(id),
        id: filterField
      }))));
    })),
    Row: function Row(rowProps) {
      var uniqFieldValue = (0, _get.default)(rowProps, uniqField);
      var rowSelected = selectedRows[uniqFieldValue];
      return /*#__PURE__*/_react.default.createElement("div", {
        "data-test-id": "richtable-row",
        className: (0, _clsx4.default)(_defineProperty({}, classes.selectedRow, selectedRowId === uniqFieldValue)),
        key: "row-".concat(uniqFieldValue),
        onKeyDown: rowClick(rowProps),
        onClick: rowClick(rowProps)
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _clsx4.default)(classes.rowContent, _defineProperty({}, classes.cursorPointer, !Array.isArray(selectedRows)), _defineProperty({}, classes.selectedRowContent, rowSelected))
      }, columns.map(function (_ref2) {
        var _ref2$Cell = _ref2.Cell,
            Cell = _ref2$Cell === void 0 ? _BaseCell.default : _ref2$Cell,
            id = _ref2.id,
            width = _ref2.width,
            _ref2$mapCellProps = _ref2.mapCellProps,
            mapCellProps = _ref2$mapCellProps === void 0 ? _noop.default : _ref2$mapCellProps,
            Component = _ref2.component,
            propsMapper = _ref2.propsMapper,
            columnProps = _ref2.props;
        var value = (0, _get.default)(rowProps, mapCellProps);
        var cellProps = typeof mapCellProps === 'string' ? {
          children: Component ? /*#__PURE__*/_react.default.createElement(Component, _extends({
            name: name,
            value: value,
            mapCellProps: mapCellProps
          }, (0, _getComponentProps.default)(propsMapper, rowProps))) : value
        } : mapCellProps(rowProps);
        return /*#__PURE__*/_react.default.createElement("div", {
          style: {
            width: width
          },
          className: classes.cell,
          key: "cell-".concat(id),
          "data-testid": "cell-".concat(id)
        }, /*#__PURE__*/_react.default.createElement(Cell, _extends({
          id: id
        }, rowProps, columnProps, cellProps)));
      })));
    }
  }))));
};

RichTable.propTypes = propTypes;
RichTable.defaultProps = defaultProps;
var _default = RichTable;
exports.default = _default;