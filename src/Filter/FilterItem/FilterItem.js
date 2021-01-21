import React from 'react'
import PropTypes from 'prop-types'
import ListItem from '@material-ui/core/ListItem'
import Chip from '@material-ui/core/Chip'

import Checkbox from 'Checkbox'

import useStyles from './FilterItem.styles'

const propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    checked: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
}

const FilterItem = (props) => {
    const {
        count,
        label,
        value,
        checked,
        disabled,
        onClick,
    } = props

    const classes = useStyles()

    return (
        <ListItem
            key={value}
            button
            disabled={disabled}
            className={classes.root}
            onClick={onClick}
        >
            <div className={classes.labelCheckbox}>
                <Checkbox
                    value={checked}
                    title={label === undefined ? value : label}
                    disabled={disabled}
                />
            </div>
            {count && (
                <Chip
                    label={count}
                    size="small"
                />
            )}
        </ListItem>
    )
}

FilterItem.propTypes = propTypes

export default FilterItem
