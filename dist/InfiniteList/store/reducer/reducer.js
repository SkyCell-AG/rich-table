"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createReducer2 = _interopRequireDefault(require("utils/createReducer"));

var statuses = _interopRequireWildcard(require("utils/requestStatuses"));

var _actions = require("../actions");

var _createReducer;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {};
var inifiniteListReducer = (0, _createReducer2.default)((_createReducer = {}, _defineProperty(_createReducer, _actions.LOAD_DATA.pending, function (state, _ref) {
  var appName = _ref.meta.appName;
  return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, appName, _objectSpread(_objectSpread({}, state[appName]), {}, {
    status: statuses.PENDING
  })));
}), _defineProperty(_createReducer, _actions.LOAD_DATA.failure, function (state, _ref2) {
  var appName = _ref2.meta.appName,
      err = _ref2.err;
  return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, appName, _objectSpread(_objectSpread({}, state[appName]), {}, {
    status: statuses.FAILURE,
    err: err
  })));
}), _defineProperty(_createReducer, _actions.LOAD_DATA.success, function (state, _ref3) {
  var payload = _ref3.payload,
      _ref3$meta = _ref3.meta,
      appName = _ref3$meta.appName,
      page = _ref3$meta.page,
      matchedResults = _ref3$meta.matchedResults;
  return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, appName, _objectSpread(_objectSpread({}, state[appName]), {}, {
    status: statuses.SUCCESS,
    data: payload,
    page: page,
    matchedResults: matchedResults
  })));
}), _defineProperty(_createReducer, _actions.ADD_DATA_ENTRY, function (state, _ref4) {
  var payload = _ref4.payload,
      appName = _ref4.meta.appName;
  return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, appName, _objectSpread(_objectSpread({}, state[appName]), {}, {
    data: [payload].concat(_toConsumableArray(state[appName].data))
  })));
}), _defineProperty(_createReducer, _actions.UPDATE_DATA_ENTRY, function (state, _ref5) {
  var payload = _ref5.payload,
      appName = _ref5.meta.appName;
  return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, appName, _objectSpread(_objectSpread({}, state[appName]), {}, {
    data: [payload].concat(_toConsumableArray(state[appName].data.filter(function (item) {
      // TODO remove this after new domain api is implementend everywhere
      if (item.contentid) {
        return item.contentid !== payload.contentid;
      }

      return item.id !== payload.id;
    })))
  })));
}), _defineProperty(_createReducer, _actions.DELETE_DATA_ENTRY, function (state, _ref6) {
  var payload = _ref6.payload,
      appName = _ref6.meta.appName;
  return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, appName, _objectSpread(_objectSpread({}, state[appName]), {}, {
    data: state[appName].data.filter(function (item) {
      return item.id !== payload.id;
    })
  })));
}), _createReducer), initialState);
var _default = inifiniteListReducer;
exports.default = _default;