import createReducer from 'utils/createReducer'

import {
    SELECT,
    SELECT_ALL,
} from './actions'

const reducer = createReducer({
    [SELECT]: (state, {
        meta: {
            id, value,
        },
    }) => {
        return {
            ...state,
            allSelected: false,
            selected: {
                ...state.selected,
                [id]: value,
            },
        }
    },
    [SELECT_ALL]: (state, {
        meta: {
            value,
        },
    }) => {
        return {
            ...state,
            selected: {},
            allSelected: value,
        }
    },
})

export default reducer
