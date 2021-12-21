import React, {
    useRef,
} from 'react'
import PropTypes from 'prop-types'
import Popover from '@mui/material/Popover'
import clsx from 'clsx'
import get from 'lodash/get'

import FilterIcon from '../FilterIcon'
import styles from './FilterPopover.module.css'

const propTypes = {
    button: PropTypes.element,
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string,
    ]).isRequired,
    opened: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    active: PropTypes.bool,
    open: PropTypes.func.isRequired,
    className: PropTypes.string,
}

const defaultProps = {
    active: false,
    className: '',
    button: null,
}

const transformOrigin = {
    vertical: 'top',
    horizontal: 'center',
}

const anchorOrigin = {
    vertical: 'bottom',
    horizontal: 'center',
}

const FilterPopover = (props) => {
    const {
        children,
        open,
        close,
        opened,
        active,
        className,
        button,
    } = props

    const filterIcon = useRef(null)
    const id = 'simple-popover'
    const dataTestId = get(props, 'data-testid')

    return (
        <div
            className={className}
            data-testid={`filterpopover-${dataTestId}`}
        >
            <div
                data-testid={dataTestId}
                ref={filterIcon}
                aria-describedby={id}
                className={clsx(
                    'cursor-pointer',
                    styles.buttonWrapper,
                    {
                        [styles.active]: (opened || active),
                    },
                )}
                onKeyDown={open}
                onClick={open}
                id={id}
            >
                {button || (
                    <FilterIcon />
                )}
            </div>
            <Popover
                id={id}
                open={opened}
                anchorEl={filterIcon.current}
                onClose={close}
                anchorOrigin={anchorOrigin}
                transformOrigin={transformOrigin}
            >
                {children}
            </Popover>
        </div>
    )
}

FilterPopover.propTypes = propTypes
FilterPopover.defaultProps = defaultProps

export default FilterPopover
