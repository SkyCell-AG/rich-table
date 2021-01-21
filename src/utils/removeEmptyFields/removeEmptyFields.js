import isEmpty from 'lodash/isEmpty'
import isObject from 'lodash/isObject'

const removeEmptyFields = (obj = {}) => {
    return Object.entries(obj).reduce((res, [
        key,
        value,
    ]) => {
        if (
            !value
            || (isObject(value)
                && isEmpty(value))
        ) {
            return res
        }

        return {
            ...res,
            [key]: value,
        }
    }, {})
}

export default removeEmptyFields
