import {
    useReducer,
    useCallback,
    useEffect,
} from 'react'

import createReducer from 'utils/createReducer'

const SET = 'SET'
const REMOVE = 'REMOVE'
const UPDATE_SORT = 'UPDATE_SORT'

const initState = {
    sort: {},
    predefinedSort: {},
}

const reducer = createReducer({
    [UPDATE_SORT]: (_, {
        meta: {
            predefinedSort,
        },
    }) => {
        return {
            ...initState,
            predefinedSort,
        }
    },
    [SET]: (state, {
        meta: {
            sort,
        },
    }) => {
        return {
            ...state,
            sort,
        }
    },
    [REMOVE]: (state) => {
        return {
            ...state,
            sort: state.predefinedSort,
        }
    },
})

const useSort = (sortOut) => {
    const [
        {
            sort,
            predefinedSort,
        },
        dispatch,
    ] = useReducer(reducer, {
        sort: sortOut,
        predefinedSort: sortOut,
    })

    useEffect(() => {
        if (sortOut !== predefinedSort) {
            dispatch({
                type: UPDATE_SORT,
                meta: {
                    predefinedSort: sortOut,
                },
            })
        }
    }, [
        sortOut,
        predefinedSort,
    ])

    const set = useCallback((field, direction) => {
        dispatch({
            type: SET,
            meta: {
                sort: {
                    field, direction,
                },
            },
        })
    }, [])

    const remove = useCallback(() => {
        dispatch({
            type: REMOVE,
        })
    }, [dispatch])

    return [
        sort,
        set,
        remove,
    ]
}

export default useSort
