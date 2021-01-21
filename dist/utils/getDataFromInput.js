"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function getDataFromInput(cb) {
  return function (_ref) {
    var value = _ref.target.value;
    return cb(value);
  };
}

var _default = getDataFromInput;
exports.default = _default;