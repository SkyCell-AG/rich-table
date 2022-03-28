import 'array-flat-polyfill'
import isEmpty from 'lodash/isEmpty'

import removeEmptyFields from './removeEmptyFields'

const valueSerializer = (values) => {
    return {
        includeFilters: [`*${values}*`],
    }
}

const exactValue = (values) => {
    return {
        includeFilters: [values],
    }
}

const arraySerializer = (values) => {
    return {
        includeFilters: values,
    }
}

const gatherLeaves = (values) => {
    if (!values) {
        return []
    }

    return Object.entries(values).reduce(
        (
            prev,
            [
                key,
                value,
            ],
        ) => {
            if (value && isEmpty(value)) {
                return [
                    ...prev,
                    key,
                ]
            }

            return [
                ...prev,
                ...gatherLeaves(value),
            ]
        },
        [],
    )
}

const tree = (values) => {
    return {
        includeFilters: gatherLeaves(values),
    }
}

const range = ([
    from,
    to,
]) => {
    return {
        rangeFilters: [removeEmptyFields({
            from,
            to,
        })],
    }
}

const dayRange = ([
    from,
    to,
]) => {
    return {
        rangeFilters: [({
            from: new Date() - new Date(from * 86400000).getTime(),
            to: new Date() - new Date(to * 86400000).getTime(),
        })],
    }
}

const dateRange = ({
    from,
    to,
}) => {
    return {
        rangeFilters: [{
            from,
            to,
        }],
    }
}

const typeSerializers = {
    value: valueSerializer,
    exactValue,
    range,
    dayRange,
    array: arraySerializer,
    tree,
    'date-range': dateRange,
}

function generateFilters(filter, typeMapping = {}) {
    const filterCleanedUp = removeEmptyFields(filter)

    if (isEmpty(filterCleanedUp)) {
        return undefined
    }

    return Object.entries(filterCleanedUp).reduce((res, [
        key,
        value,
    ]) => {
        const fieldType = typeMapping[key] || 'array'

        const filterValue = typeSerializers[fieldType](value) || {}

        return removeEmptyFields({
            ...res,
            rangeFilters: removeEmptyFields({
                ...res.rangeFilters,
                [filterValue.rangeFilters ? key : undefined]: filterValue.rangeFilters,
            }),
            includeFilters: removeEmptyFields({
                ...res.includeFilters,
                [filterValue.includeFilters ? key : undefined]: filterValue.includeFilters,
            }),
        })
    }, [])
}

export default generateFilters
