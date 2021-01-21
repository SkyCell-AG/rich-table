"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styles = require("@material-ui/styles");

var useStyles = (0, _styles.makeStyles)({
  headings: {
    position: 'sticky',
    zIndex: 1,
    top: 0,
    display: 'flex',
    justifyContent: 'space-around',
    boxShadow: function boxShadow(theme) {
      return "0 1px 2px 0 ".concat(theme.palette.secondary[100]);
    },
    minHeight: function minHeight(theme) {
      return theme.shape.tabHeight;
    },
    backgroundColor: function backgroundColor(theme) {
      return theme.palette.common.white;
    }
  },
  tableWrapper: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    fontSize: '1rem'
  },
  tableWrapperWhenEditing: {
    marginRight: 0
  },
  tabs: {
    display: 'flex',
    alignItems: 'center'
  },
  headerTableWrapper: {
    display: 'flex',
    position: 'absolute',
    width: '100%',
    overflow: 'hidden',
    overflowX: 'auto',
    justifyContent: 'space-between'
  },
  controlsWrapper: {
    display: 'flex',
    justifyContent: 'right',
    maxHeight: function maxHeight(theme) {
      return theme.shape.tabHeight;
    }
  },
  contentWrapperWhenEditing: {
    borderRight: 'none !important'
  },
  controls: {
    display: 'flex',
    zIndex: 1,
    height: function height(theme) {
      return theme.shape.tabHeight;
    },
    backgroundColor: function backgroundColor(theme) {
      return theme.palette.secondary[50];
    },
    paddingLeft: 10,
    whiteSpace: 'nowrap',
    borderRadius: '10px 10px 0px 0px',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: function borderColor(theme) {
      return theme.palette.secondary[300];
    },
    borderBottom: function borderBottom(theme) {
      return "1px solid ".concat(theme.palette.secondary[50]);
    }
  },
  control: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    color: function color(theme) {
      return theme.palette.secondary[600];
    },
    padding: '2px 20px 2px 0px'
  },
  contentWrapper: {
    position: 'relative',
    left: 0,
    padding: function padding(theme) {
      return theme.spacing(1.5);
    },
    top: function top(theme) {
      return theme.shape.tabHeight - 1;
    },
    width: function width(theme) {
      return "calc(100% - ".concat(theme.spacing(3), "px)");
    },
    height: function height(theme) {
      return "calc(100% - ".concat(theme.shape.tabHeight + theme.spacing(3) + 2, "px)");
    },
    borderRadius: '10px 0 0 0',
    backgroundColor: function backgroundColor(theme) {
      return theme.palette.secondary[50];
    },
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: function borderColor(theme) {
      return theme.palette.secondary[300];
    }
  },
  cell: {
    width: '100%',
    overflow: 'hidden',
    borderBottom: '1px solid',
    borderColor: function borderColor(theme) {
      return theme.palette.secondary[100];
    }
  },
  rowContent: {
    display: 'flex',
    justifyContent: 'space-around',
    minHeight: '40px',
    '&:hover': {
      backgroundColor: function backgroundColor(theme) {
        return theme.palette.primary[50];
      }
    }
  },
  cursorPointer: {
    cursor: 'pointer'
  },
  selectedRowContent: {
    opacity: 0.7
  },
  selectedRow: {
    background: function background(theme) {
      return "".concat(theme.palette.primary[50], " !important");
    }
  }
});
var _default = useStyles;
exports.default = _default;