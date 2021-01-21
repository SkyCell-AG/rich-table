import React, {
    useCallback,
} from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import {
    useTheme,
} from '@material-ui/core/styles'

import Filter from 'Filter'
import {
    ASC, DESC,
} from 'utils/sortDirection'

import BaseCell from 'BaseCell'
import SortIcons from './SortIcons'

import useStyles from './HeaderCell.style'

const propTypes = {
    loadFilters: PropTypes.func,
    id: PropTypes.string.isRequired,
    setFilter: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string,
    ]),
    appliedFilters: PropTypes.object, // eslint-disable-line
    FilterComponent: PropTypes.func,
    className: PropTypes.string,
    sorting: PropTypes.bool,
    sortDirection: PropTypes.string,
    sort: PropTypes.func,
}

const defaultProps = {
    className: '',
    children: undefined,
    loadFilters: null,
    appliedFilters: null,
    FilterComponent: Filter,
    sorting: true,
    sortDirection: '',
    sort: () => {},
}

const HeaderCell = (props) => {
    const {
        children,
        className,
        sortDirection,
        loadFilters,
        id,
        setFilter,
        appliedFilters,
        FilterComponent,
        sorting,
        sort,
    } = props

    const theme = useTheme()
    const classes = useStyles(theme)

    const loadFiltersWithArgs = useCallback(() => {
        return loadFilters(appliedFilters)
    }, [
        loadFilters,
        appliedFilters,
    ])

    const handleSorting = useCallback(() => {
        if (!sorting) return null

        switch (sortDirection) {
        case ASC:
            sort(DESC)
            break
        case DESC:
            sort()
            break
        default:
            sort(ASC)
        }

        return null
    }, [
        sortDirection,
        sort,
        sorting,
    ])

    return (
        <BaseCell
            {...props}
            className={clsx(
                className,
                classes.root,
            )}
        >
            <div
                className={classes.btn}
            >
                <button
                    type="button"
                    onClick={handleSorting}
                >
                    <div
                        className={classes.buttonFont}
                    >
                        {children}
                    </div>
                </button>
            </div>
            <div className={classes.controls}>
                {
                    loadFilters && (
                        <FilterComponent
                            {...props}
                            id={id}
                            loadFilters={loadFiltersWithArgs}
                            set={setFilter}
                        />
                    )
                }
                {
                    sorting && (
                        <SortIcons
                            className={classes.icon}
                            value={sortDirection}
                        />
                    )
                }
            </div>
        </BaseCell>
    )
}

HeaderCell.propTypes = propTypes
HeaderCell.defaultProps = defaultProps

export default HeaderCell
