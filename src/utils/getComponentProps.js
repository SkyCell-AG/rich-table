import get from 'lodash/get'

const LINK_PROP = 'link'

const getComponentProps = (propsMapper, rowProps) => {
    if (!propsMapper) {
        return {}
    }

    return Object.entries(propsMapper).reduce((res, [
        key,
        value,
    ]) => {
        if (key === LINK_PROP) {
            const processedLink = value.split('/').map((item) => {
                if (item.startsWith('%') && item.endsWith('%')) {
                    return get(rowProps, item.slice(1, -1))
                }

                return item
            }).join('/')

            return {
                ...res,
                [key]: processedLink,
            }
        }

        return {
            ...res,
            [key]: get(rowProps, value),
        }
    }, {})
}

export default getComponentProps
