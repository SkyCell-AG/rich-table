import {
    makeStyles,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => {
    return {
        root: {
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingRight: theme.spacing(3),
            color: theme.palette.secondary[800],
        },
        btn: {
            '& button': {
                fontFamily: theme.typography.fontFamily,
                fontSize: '1rem',
                fontWeight: `${theme.typography.fontWeightMedium} !important`,
                textDecoration: 'none',
                color: theme.palette.secondary[600],
                border: 'none',
                backgroundColor: 'transparent !important',
                padding: 0,
                textAlign: 'left',
                cursor: 'pointer',
                outline: 0,
            },
            '&:hover': {
                '&~$controls $icon': {
                    display: 'flex !important',
                },
            },
        },
        buttonFont: {
            fontSize: theme.typography.h4.fontSize,
        },
        icon: {
            display: 'none !important',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
        },
        controls: {
            display: 'flex',
            alignItems: 'center',
        },
    }
})

export default useStyles
