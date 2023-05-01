import {
    useMemo,
    useState,
    useEffect,
    useCallback,
} from 'react'
import get from 'lodash/get'

import SelectRowCell from 'componentes/SelectRowCell'

import useStyles from './useSelectRow.style'

const useSelectRow = ({
    columns,
    onSelectRow,
    uniqField,
    selectedRows = [],
    disabled = false,
    dataTable,
    showSelectAll,
}) => {
    const classes = useStyles()

    const [
        allSelected,
        setAllSelected,
    ] = useState(false)

    useEffect(() => {
        if (!showSelectAll) {
            return
        }
        if (dataTable?.length > 0 && (selectedRows.length === dataTable?.length)) {
            setAllSelected(true)
        }
    }, [
        dataTable?.length,
        selectedRows.length,
        showSelectAll,
    ])

    const selectAllRowsHandler = useCallback(() => {
        if (allSelected) {
            setAllSelected(false)
            onSelectRow([])

            return
        }

        setAllSelected(true)
        onSelectRow(dataTable?.map((item) => { return item[uniqField] }))
    }, [
        dataTable,
        onSelectRow,
        allSelected,
        uniqField,
    ])

    const selectRowHandler = useCallback((id) => {
        return () => {
            if (selectedRows.includes(id)) {
                if (allSelected) {
                    setAllSelected(false)
                }

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
        allSelected,
        selectedRows,
    ])

    const columnsWithSelect = useMemo(() => {
        if (!onSelectRow) {
            return columns
        }

        return [
            {
                id: 'Select',
                Header: SelectRowCell,
                className: !showSelectAll ? classes.hiddenCheckAll : undefined,
                width: '60px',
                mapHeaderProps: () => {
                    return {
                        onChange: selectAllRowsHandler,
                        checked: allSelected,
                        indeterminate: allSelected ? false : selectedRows.length > 0,
                        disabled,
                    }
                },
                Cell: SelectRowCell,
                mapCellProps: (rowProps) => {
                    const id = get(rowProps, uniqField)
                    const selectedRow = allSelected ? false : selectedRows.includes(id)

                    return {
                        onChange: selectRowHandler(id),
                        checked: selectedRow || allSelected,
                        selectedRow,
                        disabled,
                    }
                },
            },
            ...columns,
        ]
    }, [
        onSelectRow,
        showSelectAll,
        classes.hiddenCheckAll,
        columns,
        selectAllRowsHandler,
        allSelected,
        selectedRows,
        uniqField,
        selectRowHandler,
        disabled,
    ])

    return columnsWithSelect
}

export default useSelectRow
