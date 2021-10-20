import {
    makeStyles,
} from '@mui/styles'
import {
    useTheme,
} from '@mui/material/styles'

const useStyles = makeStyles(() => {
    const theme = useTheme()

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
        cell: {
            width: '100%',
            overflow: 'hidden',
            borderBottom: `1px solid ${theme.palette.secondary[100]}`,
        },
        iconWrapper: {
            height: 'auto',
            borderBottom: `1px solid ${theme.palette.secondary[100]}`,
            display: 'flex',
            alignItems: 'center',
            color: theme.palette.secondary[600],
        },
        isOpenIcon: {
            transform: 'rotate(90deg)',
        },
    }
})

export default useStyles
