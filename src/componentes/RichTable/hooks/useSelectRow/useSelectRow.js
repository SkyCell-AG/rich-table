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

    const selectAllColumnsHandler = useCallback((data) => {
        return (value) => {
            dispatch(
                selectAll(
                    data.reduce((acc, element) => {
                        return {
                            ...acc,
                            [element]: value,
                        }
                    }, {}),
                    value,
                ),
            )
        }
    }, [])

    const columsWithSelect = useMemo(() => {
        if (!onSelectRow) {
            return columns
        }

        return [
            {
                id: 'Select',
                Header: SelectRowCell,
                mapHeaderProps: ({
                    data,
                }) => {
                    const laneDepPricingNumbers = data.map((element) => {
                        return element.laneDependentPricing.laneDepPricingNumber
                    })

                    return {
                        onChange: selectAllColumnsHandler(laneDepPricingNumbers),
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
        selectAllColumnsHandler,
        allSelected,
        selected,
        uniqField,
    ])

    return columsWithSelect
}

export default useSelectRow
