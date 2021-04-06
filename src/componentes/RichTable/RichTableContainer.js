import React, {
    useReducer,
    useCallback,
    useMemo,
    useEffect,
} from 'react'
import PropTypes from 'prop-types'
import omit from 'lodash/omit'
import {
    v1 as uuid,
} from 'uuid'

import generateFilters from 'utils/generateFilters'
import reducer from '/store/reducer'
import * as statuses from 'utils/requestStatuses'
import generateParams from 'utils/generateParams'

import useLoadPage from 'hooks/useLoadPage'
import useVisible from 'hooks/useVisible'
import useSequence from 'hooks/useSequence'
import useFilter from 'hooks/useFilter'
import useSort from 'hooks/useSort'
import useSelectRow from 'hooks/useSelectRow'

import RichTable from './RichTable'

const initialState = {
    status: statuses.PRISTIN,
    data: [],
    matchedResults: 0,
    infinitListKey: uuid(),
}

const propTypes = {
    uniqField: PropTypes.string,
    visible: PropTypes.arrayOf(PropTypes.string),
    selectedRows: PropTypes.arrayOf(PropTypes.string),
    onSelectRow: PropTypes.func,
    load: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onFilterChange: PropTypes.func,
    selectedFilter: PropTypes.object, // eslint-disable-line
    filter: PropTypes.object, // eslint-disable-line
    sort: PropTypes.object, // eslint-disable-line
    columns: PropTypes.arrayOf(PropTypes.shape({
        props: PropTypes.object, // eslint-disable-line
    })).isRequired,
}

const defaultProps = {
    sort: {},
    visible: [],
    filter: {},
    uniqField: 'id',
    onSelectRow: undefined,
    onFilterChange: undefined,
    selectedRows: undefined,
}

const RichTableContainer = ({
    columns: outColumns,
    load,
    name,
    selectedRows,
    visible: predefinedVisible,
    sort: predefinedSort,
    filter: predefinedFilter,
    onSelectRow,
    uniqField,
    namedQuery,
    ...props
}) => {
    const [
        state,
        dispatch,
    ] = useReducer(reducer, initialState)

    const  {
        infinitListKey,
        matchedResults,
    } = state

    const typeMapping = useMemo(() => {
        return outColumns.reduce((prev, {
            filterField,
            filterType,
        }) => {
            if (!filterField) {
                return prev
            }

            return {
                ...prev,
                [filterField]: filterType,
            }
        }, {})
    }, [outColumns])

    const columns = useMemo(() => {
        return outColumns.map((column) => {
            const {
                mapHeaderProps,
                headerProps,
            } = column

            if (headerProps) {
                return {
                    ...column,
                    label: headerProps.children,
                }
            }

            if (mapHeaderProps) {
                return {
                    ...column,
                    label: mapHeaderProps().children,
                }
            }

            return {
                ...column,
                label: '',
            }
        })
    }, [outColumns])

    const [
        sequence,
        changeSequence,
    ] = useSequence(columns)
    const [
        visible,
        setVisible,
    ] = useVisible(columns, predefinedVisible)
    const [
        filter,
        setFilter,
        removeFilter,
    ] = useFilter(predefinedFilter)
    const [
        sort,
        setSorting,
        removeSort,
    ] = useSort(predefinedSort)

    const params = useMemo(() => {
        return generateParams(filter, sort)
    }, [
        filter,
        sort,
    ])

    const loadWithParams = useCallback((page) => {
        return load({
            ...params,
            typeMapping,
            page,
        }).catch((err) => {
            // eslint-disable-next-line no-console, max-len
            console.error(err) // TODO: without catch handler catch handler in InfinitListContainer doesn't fire
        })
    }, [
        load,
        params,
        typeMapping,
    ])

    const {
        loadPage,
        handleSetMatchedResults,
        handleRerenderInfinitList,
    } = useLoadPage(loadWithParams, dispatch)

    const createFilterHandler = useCallback((columnId) => {
        return (value) => {
            setFilter(columnId, value)
        }
    }, [setFilter])

    const visibleAndSortedColumns = sequence
        .filter((columnId) => {
            return visible.includes(columnId)
        })
        .map((columnId) => {
            return columns.find(({
                id,
            }) => {
                return id === columnId
            })
        })
        .filter(Boolean)
        .map((column) => {
            const appliedFilters = generateFilters(omit(
                filter,
                [column.filterField],
            ), typeMapping)

            return {
                ...column,
                props: {
                    appliedFilters,
                    filter: filter[column.filterField],
                    predefinedFilter,
                    setFilter: createFilterHandler(column.filterField || column.id),
                    [sort.field === column.id && 'sortDirection']: sort.direction,
                    sort: (direction) => {
                        setSorting(
                            column.id,
                            direction,
                        )
                    },
                },
            }
        })

    const visibleAndSortedColumnsWithSelection = useSelectRow({
        columns: visibleAndSortedColumns,
        onSelectRow,
        uniqField,
    })

    useEffect(() => {
        loadPage([], 1)
    }, [filter, namedQuery])

    return (
        <RichTable
            {...props}
            {...state}
            name={name}
            load={loadPage}
            filter={filter}
            removeFilter={removeFilter}
            rerenderInfinitList={handleRerenderInfinitList}
            removeSort={removeSort}
            setMatchedResults={handleSetMatchedResults}
            changeSequence={changeSequence}
            visible={visible}
            setVisible={setVisible}
            allColumns={columns}
            infinitListKey={infinitListKey}
            matchedResults={matchedResults}
            selectedRows={selectedRows}
            columns={visibleAndSortedColumnsWithSelection}
            uniqField={uniqField}
        />
    )
}

RichTableContainer.propTypes = propTypes
RichTableContainer.defaultProps = defaultProps

export default RichTableContainer
