"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _createReducer2 = _interopRequireDefault(require("../utils/createReducer"));

var _createReducer;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var SET_COLUMNS_SEQUENCE = 'SET_COLUMNS_SEQUENCE';
var CHANGE_COLUMNS_SEQUENCE = 'CHANGE_COLUMNS_SEQUENCE';
var reducer = (0, _createReducer2.default)((_createReducer = {}, _defineProperty(_createReducer, SET_COLUMNS_SEQUENCE, function (_, _ref) {
  var sequence = _ref.meta.sequence;
  return sequence;
}), _defineProperty(_createReducer, CHANGE_COLUMNS_SEQUENCE, function (sequence, _ref2) {
  var _ref2$meta = _slicedToArray(_ref2.meta, 2),
      a = _ref2$meta[0],
      b = _ref2$meta[1];

  var aIndex = sequence.indexOf(a);
  var sequenceWithoutB = sequence.filter(function (elem) {
    return elem !== b;
  });
  return [].concat(_toConsumableArray(sequenceWithoutB.slice(0, aIndex)), [b], _toConsumableArray(sequenceWithoutB.slice(aIndex)));
}), _createReducer));

var useSequence = function useSequence(columns) {
  var _useReducer = (0, _react.useReducer)(reducer, []),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      sequence = _useReducer2[0],
      dispatch = _useReducer2[1];

  (0, _react.useEffect)(function () {
    dispatch({
      type: SET_COLUMNS_SEQUENCE,
      meta: {
        sequence: columns.map(function (_ref3) {
          var id = _ref3.id;
          return id;
        })
      }
    });
  }, [columns]);
  var changeSequence = (0, _react.useCallback)(function (a, b) {
    dispatch({
      type: CHANGE_COLUMNS_SEQUENCE,
      meta: [a, b]
    });
  }, [dispatch]);
  return [sequence, changeSequence];
};

var _default = useSequence;
exports.default = _default;