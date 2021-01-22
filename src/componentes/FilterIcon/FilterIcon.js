import React from 'react'
import PropTypes from 'prop-types'
import {
    useTheme,
} from '@material-ui/core/styles'
import clsx from 'clsx'
import SvgIcon from '@material-ui/core/SvgIcon'
import {
    makeStyles,
} from '@material-ui/styles'

const useStyles = makeStyles({
    icon: {
        height: '20px !important',
        width: '20px !important',
    },
})

const FilterIcon = ({
    className,
}) => {
    const theme = useTheme()
    const classes = useStyles(theme)

    return (
        <SvgIcon
            className={clsx(classes.icon, className)}
            viewBox="0 0 15 15"
        >
            <path d="M2 2.054464L15.230225 2l-5.132897 4.825055-.123136 8.311554-3.318686-2.544346.142712-5.715111z" />
        </SvgIcon>
    )
}

FilterIcon.propTypes = {
    className: PropTypes.string,
}

FilterIcon.defaultProps = {
    className: '',
}

export default FilterIcon
