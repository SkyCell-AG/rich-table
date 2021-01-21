import React, {
    useState,
    useCallback,
} from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'

import FilterPopover from './FilterPopover'

const propTypes = {
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
}

const defaultProps = {
    onOpen: noop,
    onClose: noop,
}

const FilterPopoverContainer = (props) => {
    const {
        onOpen, onClose,
    } = props
    const [
        opened,
        setState,
    ] = useState(false)

    const close = useCallback(() => {
        onClose()
        setState(false)
    }, [
        setState,
        onClose,
    ])

    const open = useCallback(() => {
        onOpen()
        setState(true)
    }, [
        setState,
        onOpen,
    ])

    return (
        <FilterPopover
            opened={opened}
            open={open}
            close={close}
            {...props}
        />
    )
}

FilterPopoverContainer.propTypes = propTypes
FilterPopoverContainer.defaultProps = defaultProps

export default FilterPopoverContainer
