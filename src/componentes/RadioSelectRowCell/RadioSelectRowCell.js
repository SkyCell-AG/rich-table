import React, {
    useCallback,
} from 'react'
import PropTypes from 'prop-types'
import {
    Radio,
} from '@mui/material'

import styles from './RadioSelectRowCell.module.css'

const propTypes = {
    checked: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
}

const defaultProps = {
    checked: false,
    disabled: false,
}

const RadioSelectRowCell = ({
    checked,
    onChange,
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
            <Radio
                checked={checked}
                onChange={onChange}
                disabled={disabled}
            />
        </div>
    )
}

RadioSelectRowCell.propTypes = propTypes
RadioSelectRowCell.defaultProps = defaultProps

export default RadioSelectRowCell
