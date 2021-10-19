import {
    makeStyles,
} from '@mui/styles'
import {
    useTheme
} from "@mui/material/styles"

const useStyles = makeStyles(() => {
    const theme = useTheme()

    return {
        headings: {
            position: 'sticky',
            zIndex: 1,
            top: 0,
            display: 'flex',
            justifyContent: 'space-around',
            boxShadow: `0 1px 2px 0 ${theme.palette.secondary[100]}`,
            minHeight: theme.shape.tabHeight,
            backgroundColor: theme.palette.common.white,
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
            maxHeight: theme.shape.tabHeight,
        },
        contentWrapperWhenEditing: {
            borderRight: 'none !important',
        },
        controls: {
            display: 'flex',
            zIndex: 1,
            height: theme.shape.tabHeight,
            backgroundColor: theme.palette.secondary[50],
            paddingLeft: 10,
            whiteSpace: 'nowrap',
            borderRadius: '10px 10px 0px 0px',
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: theme.palette.secondary[300],
            borderBottom: `1px solid ${theme.palette.secondary[50]}`,
        },
        control: {
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            color: theme.palette.secondary[600],
            padding: '2px 20px 2px 0px',
        },
        contentWrapper: {
            position: 'relative',
            left: 0,
            padding: theme.spacing(1.5),
            top: theme.shape.tabHeight - 1,
            width: `calc(100% - ${theme.spacing(3)})`,
            height: `calc(100% - ${theme.shape.tabHeight}px - ${theme.spacing(3)} - 2px)`,
            borderRadius: '10px 0 0 0',
            backgroundColor: theme.palette.secondary[50],
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: theme.palette.secondary[300],
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
    }
})

export default useStyles
