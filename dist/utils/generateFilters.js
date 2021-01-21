"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("array-flat-polyfill");

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _removeEmptyFields = _interopRequireDefault(require("./removeEmptyFields"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var valueSerializer = function valueSerializer(values) {
  return {
    includeFilters: ["*".concat(values, "*")]
  };
};

var exactValue = function exactValue(values) {
  return {
    includeFilters: [values]
  };
};

var arraySerializer = function arraySerializer(values) {
  return {
    includeFilters: values
  };
};

var gatherLeaves = function gatherLeaves(values) {
  if (!values) {
    return [];
  }

  return Object.entries(values).reduce(function (prev, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    if (value && (0, _isEmpty.default)(value)) {
      return [].concat(_toConsumableArray(prev), [key]);
    }

    return [].concat(_toConsumableArray(prev), _toConsumableArray(gatherLeaves(value)));
  }, []);
};

var tree = function tree(values) {
  return {
    includeFilters: gatherLeaves(values)
  };
};

var range = function range(_ref3) {
  var _ref4 = _slicedToArray(_ref3, 2),
      from = _ref4[0],
      to = _ref4[1];

  return {
    rangeFilters: [(0, _removeEmptyFields.default)({
      from: from,
      to: to
    })]
  };
};

var dateRange = function dateRange(_ref5) {
  var from = _ref5.from,
      to = _ref5.to;
  return {
    rangeFilters: [{
      from: from,
      to: to
    }]
  };
};

var typeSerializers = {
  value: valueSerializer,
  exactValue: exactValue,
  range: range,
  array: arraySerializer,
  tree: tree,
  'date-range': dateRange
};

function generateFilters(filter) {
  var typeMapping = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var filterCleanedUp = (0, _removeEmptyFields.default)(filter);

  if ((0, _isEmpty.default)(filterCleanedUp)) {
    return undefined;
  }

  return Object.entries(filterCleanedUp).reduce(function (res, _ref6) {
    var _ref7 = _slicedToArray(_ref6, 2),
        key = _ref7[0],
        value = _ref7[1];

    var fieldType = typeMapping[key] || 'array';
    var filterValue = typeSerializers[fieldType](value) || {};
    return (0, _removeEmptyFields.default)(_objectSpread(_objectSpread({}, res), {}, {
      rangeFilters: (0, _removeEmptyFields.default)(_objectSpread(_objectSpread({}, res.rangeFilters), {}, _defineProperty({}, filterValue.rangeFilters ? key : undefined, filterValue.rangeFilters))),
      includeFilters: (0, _removeEmptyFields.default)(_objectSpread(_objectSpread({}, res.includeFilters), {}, _defineProperty({}, filterValue.includeFilters ? key : undefined, filterValue.includeFilters)))
    }));
  }, []);
}

var _default = generateFilters;
exports.default = _default;