import React from 'react'
import PropTypes from 'prop-types'

import Checkbox from '../Checkbox'

import styles from './SelectRowCell.module.css'

const propTypes = {
    checked: PropTypes.bool,
    indeterminate: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
}

const defaultProps = {
    checked: false,
    indeterminate: false,
}

const SelectRowCell = ({
    checked = false,
    indeterminate,
    onChange,
}) => {
    return (
        <div
            className={styles.wrapper}
        >
            <Checkbox
                value={checked}
                indeterminate={indeterminate}
                onChange={onChange}
            />
        </div>
    )
}

SelectRowCell.propTypes = propTypes
SelectRowCell.defaultProps = defaultProps

export default SelectRowCell
