import {
    useCallback,
    useState,
    useMemo,
} from 'react'
import get from 'lodash/get'

import SelectRowCell from 'componentes/SelectRowCell'

const useSelectRow = ({
    columns,
    onSelectRow,
    selected,
    uniqField,
}) => {
    const [
        allSelected,
        setAllSelected,
    ] = useState(false)

    const selectRowHandler = useCallback((rowId) => {
        return (checked) => {
            if (!checked) {
                onSelectRow(selected.filter((selectedId) => {
                    return rowId !== selectedId
                }))

                return
            }

            onSelectRow([
                ...selected,
                rowId,
            ])
        }
    }, [
        onSelectRow,
        selected,
    ])

    const selectAllHandler = useCallback(() => {
        return (checked) => {
            if (!checked) {
                setAllSelected(false)
                onSelectRow([])

                return
            }

            setAllSelected(true)
            onSelectRow('ALL')
        }
    }, [onSelectRow])

    const columsWithSelect = useMemo(() => {
        if (!selected) {
            return columns
        }

        return [
            {
                id: 'Select',
                Header: SelectRowCell,
                mapHeaderProps: () => {
                    return {
                        onChange: selectAllHandler(allSelected),
                        checked: allSelected,
                        indeterminate: allSelected ? false : Object.values(selected).find(Boolean),
                    }
                },
                Cell: SelectRowCell,
                mapCellProps: (rowProps) => {
                    const id = get(rowProps, uniqField)
                    const selectedRow = allSelected ? false : selected.includes(id)

                    return {
                        onChange: selectRowHandler(id, selectedRow),
                        checked: selectedRow || allSelected,
                        selectedRow,
                    }
                },
            },
            ...columns,
        ]
    }, [
        columns,
        selectRowHandler,
        allSelected,
        selectAllHandler,
        selected,
        uniqField,
    ])

    return columsWithSelect
}

export default useSelectRow
