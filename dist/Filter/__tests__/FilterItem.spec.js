"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _FilterItem = _interopRequireDefault(require("../FilterItem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('app/shared-components/Filter/FilterItem should match snapshot', function () {
  it('should match snapshot', function () {
    var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_FilterItem.default, {
      count: 10,
      label: "2500C",
      value: "9x1EF20BD4D474D284ED257A1DAE235766F6EB3C2255BB0901832616UY",
      checked: true,
      disabled: false,
      onClick: jest.fn()
    }));
    expect(wrapper).toMatchSnapshot();
  });
});