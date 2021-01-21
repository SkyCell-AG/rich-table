"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("@material-ui/core");

var useStyles = (0, _core.makeStyles)(function (theme) {
  return {
    wrapper: {
      display: 'flex',
      alignItems: 'center',
      flexGrow: 1,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      paddingLeft: 5,
      paddingRight: 5,
      minHeight: '100%',
      color: theme.palette.secondary[600],
      fontWeight: theme.typography.body1.fontWeight,
      fontSize: theme.typography.body1.fontSize
    }
  };
});
var _default = useStyles;
exports.default = _default;