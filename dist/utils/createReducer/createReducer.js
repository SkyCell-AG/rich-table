"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function createReducer(handlers, initState) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initState;
    var action = arguments.length > 1 ? arguments[1] : undefined;
    var handler = handlers[action.type];

    if (!handler) {
      return state;
    }

    return handler(state, action);
  };
}

var _default = createReducer;
exports.default = _default;