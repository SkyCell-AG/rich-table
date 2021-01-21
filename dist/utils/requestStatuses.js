"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestType = exports.FAILURE = exports.SUCCESS = exports.PENDING = exports.PRISTIN = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PRISTIN = 'PRISTIN';
exports.PRISTIN = PRISTIN;
var PENDING = 'PENDING';
exports.PENDING = PENDING;
var SUCCESS = 'SUCCESS';
exports.SUCCESS = SUCCESS;
var FAILURE = 'FAILURE';
exports.FAILURE = FAILURE;

var requestType = _propTypes.default.oneOf([PRISTIN, PENDING, SUCCESS, FAILURE]);

exports.requestType = requestType;