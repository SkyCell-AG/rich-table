import {
    makeStyles,
} from '@material-ui/styles'

const useStyles = makeStyles({
    headings: {
        position: 'sticky',
        zIndex: 1,
        top: 0,
        display: 'flex',
        justifyContent: 'space-around',
        boxShadow: (theme) => { return `0 1px 2px 0 ${theme.palette.secondary[100]}` },
        minHeight: (theme) => { return theme.shape.tabHeight },
        backgroundColor: (theme) => { return theme.palette.common.white },
    },
    tableWrapper: {
        position: 'relative',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        fontSize: '1rem',
    },
    tableWrapperWhenEditing: {
        marginRight: 0,
    },
    tabs: {
        display: 'flex',
        alignItems: 'center',
    },
    headerTableWrapper: {
        display: 'flex',
        position: 'absolute',
        width: '100%',
        overflow: 'hidden',
        overflowX: 'auto',
        justifyContent: 'space-between',
    },
    controlsWrapper: {
        display: 'flex',
        justifyContent: 'right',
        maxHeight: (theme) => { return theme.shape.tabHeight },
    },
    contentWrapperWhenEditing: {
        borderRight: 'none !important',
    },
    controls: {
        display: 'flex',
        zIndex: 1,
        height: (theme) => { return theme.shape.tabHeight },
        backgroundColor: (theme) => { return theme.palette.secondary[50] },
        paddingLeft: 10,
        whiteSpace: 'nowrap',
        borderRadius: '10px 10px 0px 0px',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: (theme) => { return theme.palette.secondary[300] },
        borderBottom: (theme) => { return `1px solid ${theme.palette.secondary[50]}` },
    },
    control: {
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        color: (theme) => { return theme.palette.secondary[600] },
        padding: '2px 20px 2px 0px',
    },
    contentWrapper: {
        position: 'relative',
        left: 0,
        padding: (theme) => { return theme.spacing(1.5) },
        top: (theme) => { return theme.shape.tabHeight - 1 },
        width: (theme) => { return `calc(100% - ${theme.spacing(3)}px)` },
        height: (theme) => { return `calc(100% - ${theme.shape.tabHeight + theme.spacing(3) + 2}px)` },
        borderRadius: '10px 0 0 0',
        backgroundColor: (theme) => { return theme.palette.secondary[50] },
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: (theme) => { return theme.palette.secondary[300] },
    },
    cell: {
        width: '100%',
        overflow: 'hidden',
    },
    cursorPointer: {
        cursor: 'pointer',
    },
    withDetailPanel: {
        paddingLeft: 24,
    },
})

export default useStyles
