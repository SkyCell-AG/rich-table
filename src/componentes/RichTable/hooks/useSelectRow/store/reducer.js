import createReducer from 'utils/createReducer'

import {
    RESET,
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
    [RESET]: (state, {
        payload: {
            selectedRows = [],
        },
    }) => {
        return {
            ...state,
            allSelected: false,
            selected: selectedRows.reduce((acc, rowId) => {
                return {
                    ...acc,
                    [rowId]: true,
                }
            }, {}),
        }
    },
})

export default reducer
