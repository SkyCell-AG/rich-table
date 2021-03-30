export const SELECT_ALL = 'SELECT_ALL'
export const SELECT = 'SELECT'

export const select = (id, value) => {
    return {
        type: SELECT,
        meta: {
            value,
            id,
        },
    }
}

export const selectAll = (selected, value) => {
    return {
        type: SELECT_ALL,
        meta: {
            selected,
            value,
        },
    }
}
