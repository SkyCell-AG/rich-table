import {
    useMemo,
    useCallback,
} from 'react'

import get from 'lodash/get'

import SelectRowCell from 'componentes/SelectRowCell'
import {
    ALL_ROWS_SELECTED,
} from './utils'

const useSelectRow = ({
    columns,
    onSelectRow,
    uniqField,
    selectedRows = [],
}) => {
    const allSelected = useMemo(() => {
        return selectedRows === ALL_ROWS_SELECTED
    }, [selectedRows])
    const selectedRowsHash = useMemo(() => {
        if (allSelected) {
            return {}
        }

        return selectedRows.reduce((acc, id) => {
            return {
                ...acc,
                [id]: true,
            }
        }, {})
    }, [
        allSelected,
        selectedRows,
    ])

    const selectRowHandler = useCallback((id) => {
        return () => {
            if (selectedRowsHash[id]) {
                onSelectRow(selectedRows.filter((oldId) => { return oldId !== id }))

                return
            }

            onSelectRow([
                ...selectedRows,
                id,
            ])
        }
    }, [
        onSelectRow,
        selectedRows,
        selectedRowsHash,
    ])

    const columsWithSelect = useMemo(() => {
        if (!onSelectRow) {
            return columns
        }

        return [
            {
                id: 'Select',
                Cell: SelectRowCell,
                mapCellProps: (rowProps) => {
                    const id = get(rowProps, uniqField)
                    const selectedRow = allSelected ? false : selectedRowsHash[id]

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
        uniqField,
        onSelectRow,
        allSelected,
        selectedRowsHash,
        selectRowHandler,
    ])

    return columsWithSelect
}

export default useSelectRow
