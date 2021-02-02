import {
    makeStyles,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => {
    return {
        selectedRow: {
            background: `${theme.palette.primary[50]} !important`,
        },
        rowContent: {
            display: 'flex',
            justifyContent: 'space-around',
            minHeight: '40px',
            '&:hover': {
                backgroundColor: theme.palette.primary[50],
            },
        },
        cursorPointer: {
            cursor: 'pointer',
        },
        selectedRowContent: {
            opacity: 0.7,
        },
        cell: {
            width: '100%',
            overflow: 'hidden',
            borderBottom: `1px solid ${theme.palette.secondary[100]}`,
        },
        hideDetails: {
            display: 'none',
        },
        showDetails: {
            display: 'block',
        },
        iconWrapper: {
            height: 'auto',
            borderBottom: `1px solid ${theme.palette.secondary[100]}`,
            display: 'flex',
            alignItems: 'center',
            color: theme.palette.secondary[600]
        },
        isOpenIcon: {
            transform: 'rotate(90deg)',
        }
    }
})

export default useStyles
