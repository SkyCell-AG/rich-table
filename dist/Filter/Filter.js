"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _get = _interopRequireDefault(require("lodash/get"));

var _CircularProgress = _interopRequireDefault(require("@material-ui/core/CircularProgress"));

var _List = _interopRequireDefault(require("@material-ui/core/List"));

var _TextField = _interopRequireDefault(require("@material-ui/core/TextField"));

var _FilterPopover = _interopRequireDefault(require("../FilterPopover"));

var statuses = _interopRequireWildcard(require("utils/requestStatuses"));

var _getDataFromInput = _interopRequireDefault(require("utils/getDataFromInput"));

var _FilterItem = _interopRequireDefault(require("./FilterItem"));

var _Filter = _interopRequireDefault(require("./Filter.styles"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var propTypes = {
  className: _propTypes.default.string,
  button: _propTypes.default.element,
  id: _propTypes.default.string.isRequired,
  setSearchPhrase: _propTypes.default.func.isRequired,
  searchPhrase: _propTypes.default.string.isRequired,
  filter: _propTypes.default.arrayOf(_propTypes.default.string),
  set: _propTypes.default.func.isRequired,
  load: _propTypes.default.func.isRequired,
  predefinedFilter: _propTypes.default.object,
  // eslint-disable-line
  filters: _propTypes.default.array,
  // eslint-disable-line
  status: _propTypes.default.oneOf([statuses.SUCCESS, statuses.FAILURE, statuses.PENDING, statuses.PRISTIN]).isRequired
};
var defaultProps = {
  predefinedFilter: {},
  filter: [],
  filters: [],
  className: '',
  button: null
};

var rearangeItems = function rearangeItems(filterItems) {
  var checkedItems = filterItems.filter(function (_ref) {
    var checked = _ref.checked;
    return checked;
  }).sort(function (a, b) {
    return a.label > b.label ? 1 : -1;
  });
  var notCheckedItems = filterItems.filter(function (_ref2) {
    var checked = _ref2.checked;
    return !checked;
  });
  return [].concat(_toConsumableArray(checkedItems), _toConsumableArray(notCheckedItems));
};

var Filter = function Filter(props) {
  var id = props.id,
      searchPhrase = props.searchPhrase,
      predefinedFilter = props.predefinedFilter,
      setSearchPhrase = props.setSearchPhrase,
      status = props.status,
      load = props.load,
      filters = props.filters,
      set = props.set,
      filter = props.filter,
      button = props.button,
      className = props.className;
  var classes = (0, _Filter.default)();
  var filterItems = rearangeItems(filters.filter(function (_ref3) {
    var _ref3$label = _ref3.label,
        label = _ref3$label === void 0 ? '' : _ref3$label,
        _ref3$value = _ref3.value,
        value = _ref3$value === void 0 ? '' : _ref3$value;
    return value.toLowerCase().includes(searchPhrase.toLowerCase()) || label.toLowerCase().includes(searchPhrase.toLowerCase());
  }).map(function (itemProps) {
    var itemValue = itemProps.value;
    var selected = filter.includes(itemValue);
    var predefinedSelected = (0, _get.default)(predefinedFilter, "[".concat(id, "]"), []).includes(itemValue);
    return _objectSpread(_objectSpread({}, itemProps), {}, {
      checked: selected,
      disabled: predefinedSelected,
      onClick: function onClick(e) {
        e.stopPropagation();
        e.preventDefault();

        if (predefinedSelected) {
          return;
        }

        set(selected ? filter.filter(function (item) {
          return item !== itemValue;
        }) : [].concat(_toConsumableArray(filter), [itemValue]));
      }
    });
  }));
  return /*#__PURE__*/_react.default.createElement(_FilterPopover.default, {
    className: className,
    onOpen: load,
    active: filter.length > 0,
    button: button
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: classes.filterListContainer
  }, status === statuses.FAILURE && /*#__PURE__*/_react.default.createElement("div", null, "an error happened."), (status === statuses.PENDING || status === statuses.PRISTIN) && /*#__PURE__*/_react.default.createElement("div", {
    className: classes.loader
  }, /*#__PURE__*/_react.default.createElement(_CircularProgress.default, {
    size: 40
  })), status === statuses.SUCCESS && /*#__PURE__*/_react.default.createElement(_List.default, {
    className: classes.filtersList
  }, /*#__PURE__*/_react.default.createElement(_TextField.default, {
    onChange: (0, _getDataFromInput.default)(setSearchPhrase),
    className: classes.searchField,
    label: "Filter search",
    value: searchPhrase,
    autoFocus: true
  }), filterItems.map(_FilterItem.default))));
};

Filter.propTypes = propTypes;
Filter.defaultProps = defaultProps;
var _default = Filter;
exports.default = _default;