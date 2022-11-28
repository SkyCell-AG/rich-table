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
            position: 'relative',
            display: 'flex',
            minHeight: '33px',
            '&:hover': {
                backgroundColor: theme.palette.primary[50],
            },
        },
        disabled: {
            '&:hover': {
                backgroundColor: 'inherit',
            },
        },
        crossLine: {
            position: 'absolute',
            top: 'calc(50% - 1px)',
            height: 1,
            width: '100%',
            background: theme.palette.secondary[600],
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
        iconChevron: {
            width: 25,
            height: 25,
        },
        isOpenIcon: {
            transform: 'rotate(90deg)',
        },
    }
})

export default useStyles
