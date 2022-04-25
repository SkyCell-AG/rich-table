import {
    useMemo,
} from 'react'

import useSelectRow from '../useSelectRow'
import useRadioSelectRow from '../useRadioSelectRow'

const useSelectRowLogic = ({
    columns,
    onSelectRow,
    uniqField,
    selectedRows = [],
    radioSelect,
}) => {
    const visibleAndSortedColumnsWithRadioSelection = useRadioSelectRow({
        columns,
        onSelectRow,
        uniqField,
        selectedRows,
    })

    const visibleAndSortedColumnsWithSelection = useSelectRow({
        columns,
        onSelectRow,
        uniqField,
        selectedRows,
    })

    const columsWithSelect = useMemo(() => {
        if (!onSelectRow) {
            return columns
        }

        if (radioSelect) {
            return visibleAndSortedColumnsWithRadioSelection
        }

        return visibleAndSortedColumnsWithSelection
    }, [
        columns,
        onSelectRow,
        radioSelect,
        visibleAndSortedColumnsWithRadioSelection,
        visibleAndSortedColumnsWithSelection,
    ])

    return columsWithSelect
}

export default useSelectRowLogic
