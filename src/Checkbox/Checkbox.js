import React, {
    useCallback,
} from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'
import {
    FormControlLabel, Checkbox as MaterialCheckbox,
} from '@material-ui/core'

const propTypes = {
    title: PropTypes.string,
    disabled: PropTypes.bool,
    indeterminate: PropTypes.bool,
    onChange: PropTypes.func,
    name: PropTypes.string,
    value: PropTypes.bool,
    className: PropTypes.string,
}

const defaultProps = {
    title: '',
    disabled: false,
    indeterminate: false,
    onChange: noop,
    name: '',
    value: false,
    className: '',
}

const Checkbox = ({
    title,
    disabled,
    indeterminate,
    onChange,
    name,
    value,
    className,
}) => {
    const handleChange = useCallback(() => {
        const newValue = !value

        onChange(newValue, {
            target: {
                name,
                value: newValue,
            },
        })
    }, [
        name,
        onChange,
        value,
    ])

    return (
        <div className={className}>
            <FormControlLabel
                control={
                    (
                        <MaterialCheckbox
                            disabled={disabled}
                            checked={value}
                            color="primary"
                            indeterminate={indeterminate}
                            onChange={handleChange}
                            value={value}
                            name={name}
                        />
                    )
                }
                label={title}
            />
        </div>
    )
}

Checkbox.propTypes = propTypes
Checkbox.defaultProps = defaultProps

export default Checkbox
