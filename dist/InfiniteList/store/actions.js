"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadDataSuccess = loadDataSuccess;
exports.loadDataPending = loadDataPending;
exports.loadDataFailure = loadDataFailure;
exports.addDataEntry = addDataEntry;
exports.updateDataEntry = updateDataEntry;
exports.deleteDataEntry = deleteDataEntry;
exports.DELETE_DATA_ENTRY = exports.UPDATE_DATA_ENTRY = exports.ADD_DATA_ENTRY = exports.LOAD_DATA = void 0;

var _generateAsyncActions = _interopRequireDefault(require("utils/generateAsyncActions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LOAD_DATA = (0, _generateAsyncActions.default)('LOAD_DATA');
exports.LOAD_DATA = LOAD_DATA;
var ADD_DATA_ENTRY = '[INFINITE LIST] ADD DATA ENTRY';
exports.ADD_DATA_ENTRY = ADD_DATA_ENTRY;
var UPDATE_DATA_ENTRY = '[INFINITE LIST] UPDATE DATA ENTRY';
exports.UPDATE_DATA_ENTRY = UPDATE_DATA_ENTRY;
var DELETE_DATA_ENTRY = '[INFINITE LIST] DELETE DATA ENTRY';
exports.DELETE_DATA_ENTRY = DELETE_DATA_ENTRY;

function loadDataSuccess(_ref) {
  var meta = _ref.meta,
      data = _ref.data;
  return {
    type: LOAD_DATA.success,
    meta: meta,
    payload: data
  };
}

function loadDataPending(appName) {
  return {
    type: LOAD_DATA.pending,
    meta: {
      appName: appName
    }
  };
}

function loadDataFailure(appName, err) {
  return {
    type: LOAD_DATA.failure,
    meta: {
      appName: appName
    },
    err: err
  };
}

function addDataEntry(appName, entry) {
  return {
    type: ADD_DATA_ENTRY,
    meta: {
      appName: appName
    },
    payload: entry
  };
}

function updateDataEntry(appName, entry) {
  return {
    type: UPDATE_DATA_ENTRY,
    meta: {
      appName: appName
    },
    payload: entry
  };
}

function deleteDataEntry(appName, entry) {
  return {
    type: DELETE_DATA_ENTRY,
    meta: {
      appName: appName
    },
    payload: entry
  };
}