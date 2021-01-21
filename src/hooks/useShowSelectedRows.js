import {
    useMemo,
    useCallback,
} from 'react'
import get from 'lodash/get'

import SelectRowCell from '../SelectRowCell'

const useShowSelectedRows = ({
    columns,
    onSelect,
    selected,
    uniqField,
}) => {
    const selectRowHandler = useCallback((id) => {
        return (checked) => {
            if (!checked) {
                onSelect(selected.filter((selectedId) => { return id !== selectedId }))

                return
            }

            onSelect([
                ...selected,
                id,
            ])
        }
    }, [
        onSelect,
        selected,
    ])

    const columsWithSelect = useMemo(() => {
        if (!selected) {
            return columns
        }

        return [
            {
                id: 'Select',
                Header: SelectRowCell,
                Cell: SelectRowCell,
                mapCellProps: (rowProps) => {
                    const id = get(rowProps, uniqField)
                    const checked = selected.includes(id)

                    return {
                        onChange: selectRowHandler(id, checked),
                        checked,
                        selected,
                    }
                },
            },
            ...columns,
        ]
    }, [
        columns,
        selectRowHandler,
        selected,
        uniqField,
    ])

    return columsWithSelect
}

export default useShowSelectedRows
