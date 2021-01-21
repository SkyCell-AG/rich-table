"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("@material-ui/core");

var useStyles = (0, _core.makeStyles)(function (theme) {
  return {
    root: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingRight: theme.spacing(3),
      color: theme.palette.secondary[800]
    },
    btn: {
      '& button': {
        fontFamily: theme.typography.fontFamily,
        fontSize: '1rem',
        fontWeight: "".concat(theme.typography.fontWeightMedium, " !important"),
        textDecoration: 'none',
        color: theme.palette.secondary[600],
        border: 'none',
        backgroundColor: 'transparent !important',
        padding: 0,
        textAlign: 'left',
        cursor: 'pointer',
        outline: 0
      },
      '&:hover': {
        '&~$controls $icon': {
          display: 'flex !important'
        }
      }
    },
    buttonFont: {
      fontSize: theme.typography.h4.fontSize
    },
    icon: {
      display: 'none !important',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)'
    },
    controls: {
      display: 'flex',
      alignItems: 'center'
    }
  };
});
var _default = useStyles;
exports.default = _default;