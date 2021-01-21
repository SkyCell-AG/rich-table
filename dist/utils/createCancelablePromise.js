"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var createCancelablePromise = function createCancelablePromise(promise) {
  var cancel = null;
  var innerPromise = new Promise(function (res, reject) {
    cancel = function cancel() {
      reject(new Error('canceled'));
    };

    return promise.then(res).catch(reject);
  });
  return [innerPromise, cancel];
};

var _default = createCancelablePromise;
exports.default = _default;