import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import CircularProgress from '@material-ui/core/CircularProgress'
import List from '@material-ui/core/List'
import TextField from '@material-ui/core/TextField'

import FilterPopover from '../FilterPopover'
import * as statuses from 'utils/requestStatuses'
import getDataFromInput from 'utils/getDataFromInput'

import FilterItem from './FilterItem'

import useStyles from './Filter.styles'

const propTypes = {
    className: PropTypes.string,
    button: PropTypes.element,
    id: PropTypes.string.isRequired,
    setSearchPhrase: PropTypes.func.isRequired,
    searchPhrase: PropTypes.string.isRequired,
    filter: PropTypes.arrayOf(PropTypes.string),
    set: PropTypes.func.isRequired,
    load: PropTypes.func.isRequired,
    predefinedFilter: PropTypes.object, // eslint-disable-line
    filters: PropTypes.array, // eslint-disable-line
    status: PropTypes.oneOf([
        statuses.SUCCESS,
        statuses.FAILURE,
        statuses.PENDING,
        statuses.PRISTIN,
    ]).isRequired,
}

const defaultProps = {
    predefinedFilter: {},
    filter: [],
    filters: [],
    className: '',
    button: null,
}

const rearangeItems = (filterItems) => {
    const checkedItems = filterItems.filter(({
        checked,
    }) => {
        return checked
    }).sort((a, b) => {
        return a.label > b.label ? 1 : -1
    })

    const notCheckedItems = filterItems.filter(({
        checked,
    }) => {
        return !checked
    })

    return [
        ...checkedItems,
        ...notCheckedItems,
    ]
}

const Filter = (props) => {
    const {
        id,
        searchPhrase,
        predefinedFilter,
        setSearchPhrase,
        status,
        load,
        filters,
        set,
        filter,
        button,
        className,
    } = props

    const classes = useStyles()

    const filterItems = rearangeItems(
        filters
            .filter(({
                label = '',
                value = '',
            }) => {
                return (
                    value.toLowerCase().includes(searchPhrase.toLowerCase())
                    || label.toLowerCase().includes(searchPhrase.toLowerCase())
                )
            })
            .map((itemProps) => {
                const {
                    value: itemValue,
                } = itemProps
                const selected = filter.includes(itemValue)
                const predefinedSelected = get(predefinedFilter, `[${id}]`, []).includes(itemValue)

                return {
                    ...itemProps,
                    checked: selected,
                    disabled: predefinedSelected,
                    onClick: (e) => {
                        e.stopPropagation()
                        e.preventDefault()
                        if (predefinedSelected) {
                            return
                        }

                        set(selected ? (
                            filter.filter((item) => {
                                return item !== itemValue
                            })
                        ) : (
                            [
                                ...filter,
                                itemValue,
                            ]
                        ))
                    },
                }
            }),
    )

    return (
        <FilterPopover
            className={className}
            onOpen={load}
            active={filter.length > 0}
            button={button}
        >
            <div className={classes.filterListContainer}>
                {status === statuses.FAILURE && (
                    <div>an error happened.</div>
                )}
                {(
                    status === statuses.PENDING || status === statuses.PRISTIN
                ) && (
                    <div className={classes.loader}>
                        <CircularProgress
                            size={40}
                        />
                    </div>
                )}
                {status === statuses.SUCCESS && (
                    <List
                        className={classes.filtersList}
                    >
                        <TextField
                            onChange={getDataFromInput(setSearchPhrase)}
                            className={classes.searchField}
                            label="Filter search"
                            value={searchPhrase}
                            autoFocus
                        />
                        {filterItems.map(FilterItem)}
                    </List>
                )}
            </div>
        </FilterPopover>
    )
}

Filter.propTypes = propTypes
Filter.defaultProps = defaultProps

export default Filter
