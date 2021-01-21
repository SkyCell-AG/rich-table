import {
    useEffect,
    useCallback,
    useReducer,
} from 'react'

import createReducer from '../utils/createReducer'

const SET = 'SET'

const initState = []

const reducer = createReducer({
    [SET]: (_, {
        meta: {
            visible,
        },
    }) => {
        return visible
    },
})

const useVisible = (columns, predefinedVisible) => {
    const [
        visibleColumns,
        dispatch,
    ] = useReducer(reducer, initState)

    const setVisible = useCallback((visible) => {
        dispatch({
            type: SET,
            meta: {
                visible,
            },
        })
    }, [dispatch])

    useEffect(() => {
        if (predefinedVisible.length === 0) {
            setVisible(columns.map(({
                id,
            }) => {
                return id
            }))

            return
        }

        setVisible(predefinedVisible)
    }, [
        setVisible,
        columns,
        predefinedVisible,
    ])

    return [
        visibleColumns,
        setVisible,
    ]
}

export default useVisible
