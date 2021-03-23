import {
    useReducer,
    useCallback,
    useEffect,
    useMemo,
} from 'react'

import get from 'lodash/get'

import createReducer from 'utils/createReducer'

import SelectRowCell from 'componentes/SelectRowCell'

const SELECT_ALL = 'SELECT_ALL'
const SELECT = 'SELECT'

const useSelectRow = ({
    columns,
    onSelectRow,
    uniqField,
}) => {
    const initState = {
        allSelected: false,
        selected: [],
    }

    const reducer = createReducer({
        [SELECT]: (state, {
            meta: {
                id, value,
            },
        }) => {
            return {
                ...state,
                allSelected: false,
                selected: {
                    ...state.selected,
                    [id]: value,
                },
            }
        },
        [SELECT_ALL]: (state, {
            meta: {
                value,
            },
        }) => {
            return {
                ...state,
                selected: [],
                allSelected: value,
            }
        },
    })

    const [
        {
            selected,
            allSelected,
        },
        dispatch,
    ] = useReducer(reducer, initState)

    const select = useCallback((id, value) => {
        dispatch({
            type: SELECT,
            meta: {
                value,
                id,
            },
        })
    }, [dispatch])

    const selectAll = useCallback((value) => {
        dispatch({
            type: SELECT_ALL,
            meta: {
                value,
            },
        })
    }, [])

    useEffect(() => {
        if (!onSelectRow) {
            return
        }

        if (allSelected) {
            onSelectRow('ALL')
        } else {
            onSelectRow([])
        }

        onSelectRow(Object.entries(selected).filter(([
            key,
            value,
        ]) => {
            return value
        }).map(([key]) => {
            return key
        }))
    }, [
        selected,
        allSelected,
        onSelectRow,
    ])

    const selectRowHandler = useCallback((rowId) => {
        return (value) => {
            select(rowId, value)
        }
    }, [select])

    const columsWithSelect = useMemo(() => {
        if (!onSelectRow) {
            return columns
        }

        return [
            {
                id: 'Select',
                Header: SelectRowCell,
                mapHeaderProps: () => {
                    return {
                        onChange: selectAll,
                        checked: allSelected,
                        indeterminate: allSelected ? false : Object.values(selected).find(Boolean),
                    }
                },
                Cell: SelectRowCell,
                mapCellProps: (rowProps) => {
                    const id = get(rowProps, uniqField)
                    const selectedRow = allSelected ? false : selected[id]

                    return {
                        onChange: selectRowHandler(id),
                        checked: selectedRow || allSelected,
                        selectedRow,
                    }
                },
            },
            ...columns,
        ]
    }, [
        columns,
        onSelectRow,
        selectRowHandler,
        allSelected,
        selectAll,
        selected,
        uniqField,
    ])

    return columsWithSelect
}

export default useSelectRow
