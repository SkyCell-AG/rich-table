import {
    useMemo,
    useCallback,
} from 'react'

import get from 'lodash/get'

import SelectRowCell from 'componentes/SelectRowCell'

const useSelectRow = ({
    columns,
    onSelectRow,
    uniqField,
    selectedRows = [],
}) => {
    const allSelected = useMemo(() => {
        return selectedRows === 'ALL'
    }, [selectedRows])
    const selectedRowsHash = useMemo(() => {
        return selectedRows.reduce((acc, id) => {
            return {
                ...acc,
                [id]: true,
            }
        }, {})
    }, [selectedRows])

    const selectAllRowsHandler = useCallback(() => {
        if (allSelected) {
            onSelectRow([])

            return
        }

        onSelectRow('ALL')
    }, [
        allSelected,
        onSelectRow,
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
                Header: SelectRowCell,
                mapHeaderProps: () => {
                    return {
                        onChange: selectAllRowsHandler,
                        checked: allSelected,
                        indeterminate: allSelected ? false : selectedRows.length > 0,
                    }
                },
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
        selectedRows.length,
        selectAllRowsHandler,
    ])

    return columsWithSelect
}

export default useSelectRow
