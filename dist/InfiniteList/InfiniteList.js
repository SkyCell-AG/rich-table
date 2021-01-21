"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _CircularProgress = _interopRequireDefault(require("@material-ui/core/CircularProgress"));

var _SnackbarContent = _interopRequireDefault(require("@material-ui/core/SnackbarContent"));

var _requestStatuses = require("utils/requestStatuses");

var _InfiniteListModule = _interopRequireDefault(require("./InfiniteList.module.css"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  data: _propTypes.default.array.isRequired,
  // eslint-disable-line
  status: _requestStatuses.requestType.isRequired,
  onScroll: _propTypes.default.func.isRequired,
  className: _propTypes.default.string,
  Row: _propTypes.default.func.isRequired,
  beforeList: _propTypes.default.element
};
var defaultProps = {
  className: '',
  beforeList: null
};

var InfiniteList = function InfiniteList(_ref) {
  var _ref$data = _ref.data,
      data = _ref$data === void 0 ? [] : _ref$data,
      status = _ref.status,
      onScroll = _ref.onScroll,
      wrapperRef = _ref.wrapperRef,
      spacerRef = _ref.spacerRef,
      className = _ref.className,
      beforeList = _ref.beforeList,
      Row = _ref.Row;
  return /*#__PURE__*/_react.default.createElement("div", {
    onScroll: onScroll,
    ref: wrapperRef,
    className: (0, _clsx.default)(_InfiniteListModule.default.wrapper, className)
  }, status === _requestStatuses.FAILURE && /*#__PURE__*/_react.default.createElement(_SnackbarContent.default, {
    className: _InfiniteListModule.default.failureMessage,
    message: "Failed to load data"
  }), beforeList, _requestStatuses.SUCCESS === status && data.length === 0 && /*#__PURE__*/_react.default.createElement("div", null, "No data to show"), data.map(Row), status === _requestStatuses.PENDING && /*#__PURE__*/_react.default.createElement(_CircularProgress.default, {
    className: _InfiniteListModule.default.loader,
    size: 40
  }), /*#__PURE__*/_react.default.createElement("div", {
    ref: spacerRef
  }));
};

InfiniteList.propTypes = propTypes;
InfiniteList.defaultProps = defaultProps;
var _default = InfiniteList;
exports.default = _default;