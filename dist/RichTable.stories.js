"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actions = void 0;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _reactRedux = require("react-redux");

var _reactDnd = require("react-dnd");

var _reactDndHtml5Backend = require("react-dnd-html5-backend");

var _redux = require("redux");

var _reducer = _interopRequireDefault(require("./reducer"));

var _index = _interopRequireDefault(require("./index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var actions = {
  onClick: (0, _addonActions.action)('onClick')
};
exports.actions = actions;
var store = (0, _redux.createStore)((0, _redux.combineReducers)({
  infiniteList: _reducer.default
}));
(0, _react2.storiesOf)('RichTable').add('default', function () {
  return /*#__PURE__*/_react.default.createElement(_reactRedux.Provider, {
    store: store
  }, /*#__PURE__*/_react.default.createElement(_reactDnd.DndProvider, {
    backend: _reactDndHtml5Backend.HTML5Backend
  }, /*#__PURE__*/_react.default.createElement(_index.default, {
    name: "myRichTable",
    columns: [{
      id: 'field1',
      filterField: 'field1',
      mapHeaderProps: function mapHeaderProps() {
        return {
          children: 'Field 1'
        };
      },
      mapCellProps: 'field1'
    }, {
      id: 'field2',
      filterField: 'field2',
      mapHeaderProps: function mapHeaderProps() {
        return {
          children: 'Field 2'
        };
      },
      mapCellProps: 'field2'
    }, {
      id: 'field3',
      filterField: 'field3',
      mapHeaderProps: function mapHeaderProps() {
        return {
          children: 'Field 3'
        };
      },
      mapCellProps: 'field3'
    }],
    load: function load() {
      return Promise.resolve({
        meta: {
          matchedresults: 1000
        },
        data: [{
          id: '1',
          field1: 'Field 1 content',
          field2: 'Field 2 content',
          field3: 'Field 3 content'
        }, {
          id: '2',
          field1: 'Field 1 content 2',
          field2: 'Field 2 content 2',
          field3: 'Field 3 content 2'
        }]
      });
    }
  })));
});