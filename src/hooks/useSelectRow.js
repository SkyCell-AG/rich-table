/* eslint-disable */
/* eslint-disable */
import {
    useReducer,
    useCallback,
    useEffect,
} from 'react'


import createReducer from 'app/utils/createReducer'

import SelectRowCell from '../SelectRowCell'

const SELECT_ALL = 'SELECT_ALL'
const SELECT = 'SELECT'

const initState = {
    allSelected: false,
    selected: {},
}

const reducer = createReducer({
    [SELECT]: (state, { meta: { id, value } }) => {
        return {
            ...state,
            allSelected: false,
            selected: {
                ...state.selected,
                [id]: value,
            },
        }
    },
    [SELECT_ALL]: (state, { meta: { value } }) => {
        return {
            ...state,
            selected: {},
            allSelected: value,
        }
    },
})

const useSelectRow = (onSelectRow, columns) => {
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
    }, [
        dispatch,
    ])

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

            return
        }

        onSelectRow(Object.entries(selected).filter(([value]) => {
            return value
        }).map(([key]) => {
            return key
        }))
    }, [selected, allSelected, onSelectRow])

    const selectRowHandler = useCallback((rowId) => {
        return (value) => {
            select(rowId, value)
        }
    }, [
        select,
    ])

    return onSelectRow ? [
        selected,
        [
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
                mapCellProps: ({ id }) => {
                    const selectedRow = allSelected ? false : selected[id]

                    return {
                        onChange: selectRowHandler(id),
                        indeterminate: allSelected,
                        checked: selectedRow,
                        selectedRow,
                    }
                },
            },
            ...columns,
        ],
    ] : [
        {},
        columns,
    ]
}

export default useSelectRow
