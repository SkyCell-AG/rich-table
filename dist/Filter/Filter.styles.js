"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("@material-ui/core");

var useStyles = (0, _core.makeStyles)(function (theme) {
  return {
    filterListContainer: {
      minWidth: 200,
      minHeight: 100,
      maxHeight: 400
    },
    loader: {
      display: 'flex',
      justifyContent: 'center'
    },
    searchField: {
      display: 'flex',
      maxWidth: '100%',
      margin: "".concat(theme.spacing(2), "px !important")
    }
  };
});
var _default = useStyles;
exports.default = _default;