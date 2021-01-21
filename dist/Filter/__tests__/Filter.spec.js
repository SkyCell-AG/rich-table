"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _Filter = _interopRequireDefault(require("../Filter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('app/shared-components/Filter should match snapshot', function () {
  it('should match snapshot', function () {
    var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_Filter.default, {
      className: "makeStyles-item-2",
      id: "containerStatus",
      setSearchPhrase: jest.fn(),
      searchPhrase: "",
      filter: ['9x1EF20BD4D474D284ED257A1DAE235766F6EB3C2255BB0901832616UY'],
      set: jest.fn(),
      load: jest.fn(),
      predefinedFilter: {},
      filters: [{
        count: 10,
        label: '2500C',
        value: '9x1EF20BD4D474D284ED257A1DAE235766F6EB3C2255BB0901832616UY'
      }, {
        count: 4,
        label: '1500C',
        value: '9x1EF20BD4D474D284ED257A1DAE235766F6EB3C2255BB0901832618B5'
      }],
      status: "SUCCESS"
    }));
    expect(wrapper).toMatchSnapshot();
  });
  it('renders without crashing', function () {
    (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_Filter.default, {
      id: "containerStatus",
      setSearchPhrase: jest.fn(),
      searchPhrase: "",
      filter: ['9x1EF20BD4D474D284ED257A1DAE235766F6EB3C2255BB0901832616UY'],
      set: jest.fn(),
      load: jest.fn(),
      status: "SUCCESS"
    }));
  });
});