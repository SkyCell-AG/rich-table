import {
    makeStyles,
} from '@mui/styles'
import {
    useTheme,
} from '@mui/material/styles'

const useStyles = makeStyles(() => {
    const theme = useTheme()

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
            fontSize: theme.typography.body1.fontSize,
        },
    }
})

export default useStyles
