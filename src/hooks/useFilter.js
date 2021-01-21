import {
    useReducer,
    useCallback,
    useEffect,
} from 'react'

import createReducer from 'utils/createReducer'
import removeEmptyFields from 'utils/removeEmptyFields'

const UPDATE_FILTER = 'UPDATE_FILTER'
const SET_FILTER = 'SET_FILTER'
const REMOVE_FILTER = 'REMOVE_FILTER'

const initState = {
    filter: {},
    predefinedFilter: {},
}

const reducer = createReducer({
    [REMOVE_FILTER]: ({
        predefinedFilter,
    }) => {
        return {
            ...initState,
            filter: predefinedFilter,
            predefinedFilter,
        }
    },
    [UPDATE_FILTER]: (state, {
        meta: {
            filter,
        },
    }) => {
        return {
            ...state,
            filter,
            predefinedFilter: filter,
        }
    },
    [SET_FILTER]: (state, {
        meta: {
            column, value,
        },
    }) => {
        return {
            ...state,
            filter: removeEmptyFields({
                ...state.filter,
                [column]: value,
            }),
        }
    },
})

const useFilter = (filterOut) => {
    const [
        {
            filter,
            predefinedFilter,
        },
        dispatch,
    ] = useReducer(reducer, {
        filter: filterOut,
        predefinedFilter: filterOut,
    })

    useEffect(() => {
        if (predefinedFilter !== filterOut) {
            dispatch({
                type: UPDATE_FILTER,
                meta: {
                    filter: filterOut,
                },
            })
        }
    }, [
        predefinedFilter,
        filterOut,
    ])

    const setFilter = useCallback((column, value) => {
        dispatch({
            type: SET_FILTER,
            meta: {
                column,
                value,
            },
        })
    }, [dispatch])

    const removeFilter = useCallback(() => {
        dispatch({
            type: REMOVE_FILTER,
        })
    }, [])

    return [
        filter,
        setFilter,
        removeFilter,
    ]
}

export default useFilter
