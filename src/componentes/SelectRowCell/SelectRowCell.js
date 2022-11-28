import React, {
    useCallback,
} from 'react'
import PropTypes from 'prop-types'

import Checkbox from 'componentes/Checkbox'

import styles from './SelectRowCell.module.css'

const propTypes = {
    checked: PropTypes.bool,
    indeterminate: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    data: PropTypes.array, // eslint-disable-line react/forbid-prop-types
    disabled: PropTypes.bool,
}

const defaultProps = {
    checked: false,
    indeterminate: false,
    data: [],
    disabled: false,
}

const SelectRowCell = ({
    checked = false,
    indeterminate,
    onChange,
    data,
    disabled,
}) => {
    const stopDetailPanelPropagation = useCallback((e) => {
        e.stopPropagation()
    }, [])

    return (
        <div
            className={styles.wrapper}
            onClick={stopDetailPanelPropagation}
            onKeyDown={stopDetailPanelPropagation}
        >
            <Checkbox
                value={checked}
                indeterminate={indeterminate}
                onChange={onChange}
                data={data}
                disabled={disabled}
            />
        </div>
    )
}

SelectRowCell.propTypes = propTypes
SelectRowCell.defaultProps = defaultProps

export default SelectRowCell
