import {
    makeStyles,
} from '@mui/styles'
import {
    useTheme,
} from '@mui/material/styles'

const useStyles = makeStyles(() => {
    const theme = useTheme()

    return {
        filterListContainer: {
            minWidth: 200,
            minHeight: 100,
            maxHeight: 400,
        },

        loader: {
            display: 'flex',
            justifyContent: 'center',
        },

        searchField: {
            display: 'flex',
            maxWidth: '100%',
            margin: `${theme.spacing(2)} !important`,
        },
    }
})

export default useStyles
