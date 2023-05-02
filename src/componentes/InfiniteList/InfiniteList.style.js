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
            height: '100%',
            overflow: 'auto',
            backgroundColor: theme.palette.common.white,
            borderRadius: '10px 10px 0px 0px',
            boxShadow: '0px 1px 3px #00000033',
        },
        loadMoreContainer: {
            display: 'flex',
            justifyContent: 'center',
        },
        loadMore: {
            position: 'absolute',
            marginTop: '-64px',
        },
        loader: {
            position: 'absolute',
            left: '50%',
            top: '80%',
            marginLeft: '-20px',
            marginTop: '-20px',
            zIndex: 2,
        },
        failureMessage: {
            zIndex: 2,
            position: 'sticky',
            top: 0,
            backgroundColor: '#d32f2f',
        },
        pendingContainer: {
            marginTop: theme.spacing(6.875),
        },
        noDataContainer: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: theme.spacing(3),
        },
        noData: {
            fontSize: theme.typography.body1.fontSize,
            color: theme.typography.body1.color,
            fontWeight: theme.typography.body1.fontWeight,
        },
    }
})

export default useStyles
