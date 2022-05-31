import {
    useMemo,
    useCallback,
} from 'react'

import get from 'lodash/get'
import includes from 'lodash/includes'
import noop from 'lodash/noop'

import HeaderCell from 'componentes/HeaderCell'
import RadioSelectRowCell from 'componentes/RadioSelectRowCell'

import useStyles from './useRadioSelectRow.style'

const useRadioSelectRow = ({
    columns,
    onSelectRow,
    uniqField,
    selectedRows = [],
}) => {
    const classes = useStyles()

    const selectRowHandler = useCallback((id) => {
        return () => {
            if (includes(selectedRows, id)) {
                return
            }

            onSelectRow([id])
        }
    }, [
        onSelectRow,
        selectedRows,
    ])

    return useMemo(() => {
        if (!onSelectRow) {
            return columns
        }

        return [
            {
                id: 'Select',
                className: classes.headerCell,
                Header: HeaderCell,
                mapHeaderProps: () => {
                    return {
                        setFilter: noop,
                    }
                },
                width: '60px',
                Cell: RadioSelectRowCell,
                mapCellProps: (rowProps) => {
                    const id = get(rowProps, uniqField)
                    const selectedRow = includes(selectedRows, id)

                    return {
                        onChange: selectRowHandler(id),
                        checked: selectedRow,
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
        selectRowHandler,
        classes.headerCell,
        selectedRows,
    ])
}

export default useRadioSelectRow
