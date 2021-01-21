import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import useStyles from './BaseCell.style'

const propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string,
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.element),
    ]),
    className: PropTypes.string,
}

const defaultProps = {
    className: '',
    children: null,
}

const BaseCell = ({
    children,
    className,
}) => {
    const classes = useStyles()

    return (
        <div
            className={clsx(
                classes.wrapper,
                className,
            )}
        >
            {children}
        </div>
    )
}

BaseCell.propTypes = propTypes
BaseCell.defaultProps = defaultProps

export default BaseCell
