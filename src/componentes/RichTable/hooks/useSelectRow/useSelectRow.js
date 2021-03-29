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
    select,
    selectAll,
} from './store/actions'

const useSelectRow = ({
    columns,
    onSelectRow,
    uniqField,
}) => {
    const initState = {
        allSelected: false,
        selected: {},
    }
    const [
        {
            selected,
            allSelected,
        },
        dispatch,
    ] = useReducer(reducer, initState)

    useEffect(() => {
        if (!onSelectRow) {
            return
        }

        if (allSelected) {
            onSelectRow(['ALL'])
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
            dispatch(select(rowId, value))
        }
    }, [])

    const selectAllHandler = useCallback((data) => {
        return dispatch(selectAll(data))
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
                        onChange: selectAllHandler,
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
        selectAllHandler,
        allSelected,
        selected,
        uniqField,
    ])

    return columsWithSelect
}

export default useSelectRow
