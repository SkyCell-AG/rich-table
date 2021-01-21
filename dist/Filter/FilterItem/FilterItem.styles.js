"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("@material-ui/core");

var useStyles = (0, _core.makeStyles)(function () {
  return {
    root: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingTop: 0,
      paddingBottom: 0,
      height: '40px !important'
    },
    labelCheckbox: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center'
    }
  };
});
var _default = useStyles;
exports.default = _default;