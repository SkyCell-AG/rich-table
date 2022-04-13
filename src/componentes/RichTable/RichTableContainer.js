import React, {
    useCallback,
    useReducer,
    forwardRef,
    useEffect,
    useMemo,
    useRef,
} from 'react'
import PropTypes from 'prop-types'
import omit from 'lodash/omit'
import {
    v1 as uuid,
} from 'uuid'

import createReducer from 'utils/createReducer'
import generateFilters from 'utils/generateFilters'

import useVisible from './hooks/useVisible'
import useSequence from './hooks/useSequence'
import useFilter from './hooks/useFilter'
import useSort from './hooks/useSort'
import useSelectRow from './hooks/useSelectRow'
import generateParams from './generateParams'

import RichTable from './RichTable'

const SET_MATCHED_RESULTS = 'SET_MATCHED_RESULTS'
const RERENDER_INFINIT_LIST = 'RERENDER_INFINIT_LIST'

const initState = {
    matchedResults: 0,
    infinitListKey: uuid(),
}

const reducer = createReducer({
    [RERENDER_INFINIT_LIST]: (state) => {
        return {
            ...state,
            infinitListKey: uuid(),
        }
    },
    [SET_MATCHED_RESULTS]: (state, {
        meta: {
            matchedResults,
        },
    }) => {
        return {
            ...state,
            matchedResults,
        }
    },
})

const propTypes = {
    uniqField: PropTypes.string,
    visible: PropTypes.arrayOf(PropTypes.string),
    selectedRows: PropTypes.arrayOf(PropTypes.string),
    onSelectRow: PropTypes.func,
    load: PropTypes.func.isRequired,
    onFilterChange: PropTypes.func,
    selectedFilter: PropTypes.object, // eslint-disable-line
    filter: PropTypes.object, // eslint-disable-line
    excludeFilters: PropTypes.object, // eslint-disable-line
    sort: PropTypes.object, // eslint-disable-line
    columns: PropTypes.arrayOf(PropTypes.shape({
        props: PropTypes.object, // eslint-disable-line
    })).isRequired,
}

const defaultProps = {
    sort: {},
    visible: [],
    filter: {},
    excludeFilters: {},
    uniqField: 'id',
    onSelectRow: undefined,
    onFilterChange: undefined,
    selectedRows: undefined,
}

const RichTableContainer = forwardRef(({
    columns: outColumns,
    load,
    selectedRows,
    visible: predefinedVisible,
    sort: predefinedSort,
    filter: predefinedFilter,
    excludeFilters,
    onSelectRow,
    uniqField,
    ...props
}, ref) => {
    const [
        {
            matchedResults,
            infinitListKey,
        },
        dispatch,
    ] = useReducer(reducer, {
        ...initState,
    })

    const infiniteListRef = useRef(null)

    useEffect(() => {
        if (!ref) {
            return
        }

        ref.current = { // eslint-disable-line
            update: (updatedElement) => {
                infiniteListRef.current.update(updatedElement)
            },
            add: (updatedElement) => {
                infiniteListRef.current.add(updatedElement)
            },
        }
    }, [ref])

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
        return generateParams(filter, sort, excludeFilters)
    }, [
        excludeFilters,
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

    const setMatchedResults = useCallback((newMatchedResults) => {
        dispatch({
            type: SET_MATCHED_RESULTS,
            meta: {
                matchedResults: newMatchedResults,
            },
        })
    }, [dispatch])

    const rerenderInfinitList = useCallback(() => {
        dispatch({
            type: RERENDER_INFINIT_LIST,
        })
    }, [dispatch])

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
                    sortDirection: sort.field === column.id ? sort.direction : undefined,
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
        selectedRows,
    })

    return (
        <RichTable
            {...props}
            ref={infiniteListRef}
            load={loadWithParams}
            removeFilter={removeFilter}
            infinitListKey={infinitListKey}
            rerenderInfinitList={rerenderInfinitList}
            removeSort={removeSort}
            setMatchedResults={setMatchedResults}
            matchedResults={matchedResults}
            changeSequence={changeSequence}
            visible={visible}
            setVisible={setVisible}
            allColumns={columns}
            selectedRows={selectedRows}
            columns={visibleAndSortedColumnsWithSelection}
            uniqField={uniqField}
        />
    )
})

RichTableContainer.propTypes = propTypes
RichTableContainer.defaultProps = defaultProps

export default RichTableContainer
