import get from 'lodash/get'

function mergeFilters(filter1 = {}, filter2 = {}) {
    return [
        ...Object.entries(filter1),
        ...Object.entries(filter2),
    ].reduce((res, [
        key,
        value,
    ]) => {
        return {
            ...res,
            [key]: [
                ...value,
                ...get(res, key, []),
            ],
        }
    }, {})
}

export default mergeFilters
