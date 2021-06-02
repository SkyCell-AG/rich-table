export const SELECT_ALL = 'SELECT_ALL'
export const SELECT = 'SELECT'
export const RESET = 'RESET'

export const reset = (selectedRows) => {
    return {
        type: RESET,
        payload: {
            selectedRows,
        },
    }
}

export const select = (id, value) => {
    return {
        type: SELECT,
        meta: {
            value,
            id,
        },
    }
}

export const selectAll = (value) => {
    return {
        type: SELECT_ALL,
        meta: {
            value,
        },
    }
}
