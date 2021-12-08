import memoize from 'lodash/memoize'
import isEmpty from 'lodash/isEmpty'

const generateParams = memoize((filter, sort, excludeFilters) => {
    const params = {}

    if (!isEmpty(filter)) {
        params.filter = filter
    }

    if (!isEmpty(sort)) {
        params.sort = sort
    }
    if (!isEmpty(excludeFilters)) {
        params.excludeFilters = excludeFilters
    }

    return params
}, (...data) => {
    return JSON.stringify(data)
})

export default generateParams
