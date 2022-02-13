import {
    useMemo,
    useCallback,
} from 'react'

import get from 'lodash/get'

import SelectRowCell from 'componentes/SelectRowCell'

import useStyles from './useSelectRow.style'

import {
    ALL_ROWS_SELECTED,
} from './utils'

const useSelectRow = ({
    columns,
    onSelectRow,
    uniqField,
    selectedRows = [],
}) => {
    const classes = useStyles()
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

    const selectAllRowsHandler = useCallback(() => {
        if (allSelected) {
            onSelectRow([])

            return
        }

        onSelectRow(ALL_ROWS_SELECTED)
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
                className: classes.checkAll,
                width: '60px',
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
        classes.checkAll,
    ])

    return columsWithSelect
}

export default useSelectRow
