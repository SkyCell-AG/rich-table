import {
    useReducer,
    useCallback,
    useEffect,
    useMemo,
} from 'react'

import get from 'lodash/get'

import SelectRowCell from 'componentes/SelectRowCell'

import reducer from './store/reducer'
import {
    reset,
    select,
    selectAll,
} from './store/actions'

const useSelectRow = ({
    columns,
    onSelectRow,
    uniqField,
    selectedRows = [],
}) => {
    const initState = {
        allSelected: false,
        selected: selectedRows.reduce((res, key) => {
            return {
                [key]: true,
                ...res,
            }
        }, {}),
    }

    const [
        {
            selected,
            allSelected,
        },
        dispatch,
    ] = useReducer(reducer, initState)

    useEffect(() => {
        dispatch(reset(selectedRows))
    }, [selectedRows])

    useEffect(() => {
        if (!onSelectRow) {
            return
        }

        if (allSelected) {
            onSelectRow('ALL')
            return
        }

        onSelectRow(Object.entries(selected).filter(([
            _, // eslint-disable-line no-unused-vars
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
            dispatch(select(rowId, value))
        }
    }, [])

    const selectAllRowsHandler = useCallback((value) => {
        return dispatch(selectAll(value))
    }, [])

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
                        onChange: selectAllRowsHandler,
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
        selectAllRowsHandler,
        allSelected,
        selected,
        uniqField,
    ])

    return columsWithSelect
}

export default useSelectRow
