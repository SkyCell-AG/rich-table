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
    disabled,
}) => {
    const visibleAndSortedColumnsWithRadioSelection = useRadioSelectRow({
        columns,
        onSelectRow,
        uniqField,
        selectedRows,
        disabled,
    })

    const visibleAndSortedColumnsWithSelection = useSelectRow({
        columns,
        onSelectRow,
        uniqField,
        selectedRows,
        disabled,
    })

    return useMemo(() => {
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
}

export default useSelectRowLogic
