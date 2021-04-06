import {
    useEffect, useReducer, useCallback,
} from 'react'

import createReducer from 'utils/createReducer'

const SET_COLUMNS_SEQUENCE = 'SET_COLUMNS_SEQUENCE'
const CHANGE_COLUMNS_SEQUENCE = 'CHANGE_COLUMNS_SEQUENCE'

const reducer = createReducer({
    [SET_COLUMNS_SEQUENCE]: (_, {
        meta: {
            sequence,
        },
    }) => {
        return sequence
    },
    [CHANGE_COLUMNS_SEQUENCE]: (sequence, {
        meta: [
            a,
            b,
        ],
    }) => {
        const aIndex = sequence.indexOf(a)
        const sequenceWithoutB = sequence.filter((elem) => {
            return elem !== b
        })

        return [
            ...sequenceWithoutB.slice(0, aIndex),
            b,
            ...sequenceWithoutB.slice(aIndex),
        ]
    },
})

const useSequence = (columns) => {
    const [
        sequence,
        dispatch,
    ] = useReducer(reducer, [])

    useEffect(() => {
        dispatch({
            type: SET_COLUMNS_SEQUENCE,
            meta: {
                sequence: columns.map(({
                    id,
                }) => {
                    return id
                }),
            },
        })
    }, [columns])

    const changeSequence = useCallback((a, b) => {
        dispatch({
            type: CHANGE_COLUMNS_SEQUENCE,
            meta: [
                a,
                b,
            ],
        })
    }, [dispatch])

    return [
        sequence,
        changeSequence,
    ]
}

export default useSequence
