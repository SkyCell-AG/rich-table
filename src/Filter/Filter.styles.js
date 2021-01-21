import {
    makeStyles,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => {
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
            margin: `${theme.spacing(2)}px !important`,
        },
    }
})

export default useStyles
