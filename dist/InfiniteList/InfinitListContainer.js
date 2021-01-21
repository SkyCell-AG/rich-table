"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _noop = _interopRequireDefault(require("lodash/noop"));

var _get = _interopRequireDefault(require("lodash/get"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var statuses = _interopRequireWildcard(require("utils/requestStatuses"));

var _createCancelablePromise = _interopRequireDefault(require("utils/createCancelablePromise"));

var _actions = require("./store/actions");

var _InfiniteList = _interopRequireDefault(require("./InfiniteList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var propTypes = {
  load: _propTypes.default.func.isRequired,
  name: _propTypes.default.string.isRequired,
  onUpdateMatchedResults: _propTypes.default.func
};
var defaultProps = {
  onUpdateMatchedResults: _noop.default
};
var defaultState = {
  status: statuses.PRISTIN,
  data: [],
  matchedResults: 0
};

var InfiniteListContainer = function InfiniteListContainer(props) {
  var load = props.load,
      name = props.name,
      onUpdateMatchedResults = props.onUpdateMatchedResults;
  var dispatch = (0, _reactRedux.useDispatch)();
  var state = (0, _reactRedux.useSelector)(function (_ref) {
    var infiniteList = _ref.infiniteList;
    return _objectSpread(_objectSpread({}, defaultState), infiniteList[name]);
  });
  var wrapperRef = (0, _react.useRef)(null);
  var spacerRef = (0, _react.useRef)(null);
  var cancelRequest = (0, _react.useRef)(null);
  var hasMore = state.data.length < state.matchedResults;
  var loadNewPage = (0, _react.useCallback)(function (oldVal, page) {
    dispatch((0, _actions.loadDataPending)(name));

    var _createCancelableProm = (0, _createCancelablePromise.default)(load(page)),
        _createCancelableProm2 = _slicedToArray(_createCancelableProm, 2),
        request = _createCancelableProm2[0],
        cancel = _createCancelableProm2[1];

    cancelRequest.current = cancel;
    request.then(function (response) {
      if (!(0, _get.default)(response, 'data') || (0, _get.default)(response, 'meta.matchedresults') === undefined) {
        throw new Error('Not valid response');
      }

      return response;
    }).then(function (_ref2) {
      var data = _ref2.data,
          matchedresults = _ref2.meta.matchedresults;
      cancelRequest.current = null;
      dispatch((0, _actions.loadDataSuccess)({
        meta: {
          appName: name,
          page: page,
          matchedResults: matchedresults
        },
        data: [].concat(_toConsumableArray(oldVal), _toConsumableArray(data))
      }));
    }).catch(function (err) {
      if (err.message === 'canceled') {
        return;
      }

      dispatch((0, _actions.loadDataFailure)(name, err));
    });
  }, [name, load, dispatch]);
  var loadNextPage = (0, _react.useCallback)(function () {
    loadNewPage(state.data, state.page + 1);
  }, [loadNewPage, state.data, state.page]);
  var onScroll = (0, _react.useCallback)(function (_ref3) {
    var target = _ref3.target;

    if (state.status === statuses.PENDING || !hasMore || target !== wrapperRef.current || target.scrollHeight - target.scrollTop > target.offsetHeight * 1.2) {
      return;
    }

    loadNextPage();
  }, [state.status, hasMore, loadNextPage]);
  (0, _react.useEffect)(function () {
    if (cancelRequest.current) {
      cancelRequest.current();
    }

    loadNewPage([], 1);
  }, [loadNewPage]);
  (0, _react.useEffect)(function () {
    onUpdateMatchedResults(state.matchedResults);
  }, [onUpdateMatchedResults, state.matchedResults]);
  (0, _react.useLayoutEffect)(function () {
    if (state.status !== statuses.SUCCESS) {
      return;
    }

    var wrapper = wrapperRef.current;
    var spacer = spacerRef.current;

    if (!hasMore) {
      spacer.style.height = '0px';
      return;
    }

    var _wrapper$getBoundingC = wrapper.getBoundingClientRect(),
        wrapperHeight = _wrapper$getBoundingC.height;

    var children = _toConsumableArray(wrapper.childNodes);

    var childrenHeight = children.reduce(function (sum, element) {
      if (element === spacer) {
        return sum;
      }

      var _element$getBoundingC = element.getBoundingClientRect(),
          height = _element$getBoundingC.height;

      return sum + height;
    }, 0);
    var heightDiff = wrapperHeight - childrenHeight;

    if (heightDiff > 0) {
      spacer.style.height = "".concat(heightDiff + 20, "px");
    } else {
      spacer.style.height = '0px';
    }
  }, [state.data, state.status, hasMore]);
  return /*#__PURE__*/_react.default.createElement(_InfiniteList.default, _extends({}, props, {
    wrapperRef: wrapperRef,
    spacerRef: spacerRef,
    hasMore: hasMore,
    data: state.data,
    status: state.status,
    loadNextPage: loadNextPage,
    onScroll: state.status === statuses.SUCCESS || statuses.PRISTIN ? onScroll : _noop.default
  }));
};

InfiniteListContainer.propTypes = propTypes;
InfiniteListContainer.defaultProps = defaultProps;
var _default = InfiniteListContainer;
exports.default = _default;