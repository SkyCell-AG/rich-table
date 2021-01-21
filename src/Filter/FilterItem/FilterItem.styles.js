import {
    makeStyles,
} from '@material-ui/core'

const useStyles = makeStyles(() => {
    return {
        root: {
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: 0,
            paddingBottom: 0,
            height: '40px !important',
        },
        labelCheckbox: {
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
    }
})

export default useStyles
