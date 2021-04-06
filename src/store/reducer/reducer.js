import createReducer from 'utils/createReducer'
import * as statuses from 'utils/requestStatuses'

import {
    LOAD_DATA,
    ADD_DATA_ENTRY,
    UPDATE_DATA_ENTRY,
    DELETE_DATA_ENTRY,
    SET_MATCHED_RESULTS,
    RERENDER_INFINIT_LIST,
} from '../actions'

const initialState = {}

const reducer = createReducer({
    [LOAD_DATA.pending]: (state) => {
        return {
            ...state,
            status: statuses.PENDING,
        }
    },
    [LOAD_DATA.failure]: (
        state,
        err
    ) => {
        return {
            ...state,
            status: statuses.FAILURE,
            err,
        }
    },
    [LOAD_DATA.success]: (state,
        {
            payload, meta: {
                page, matchedResults,
            },
        }) => {
        return {
            ...state,
            status: statuses.SUCCESS,
            data: payload,
            page,
            matchedResults,
        }
    },
    [ADD_DATA_ENTRY]: (state,
        {
            payload,
        }) => {
        return {
            ...state,
            data: [
                payload,
                ...state.data,
            ],
        }
    },
    [UPDATE_DATA_ENTRY]: (
        state,
        {
            payload,
        },
    ) => {
        return {
            ...state,
            data: [
                payload,
                ...data.filter((item) => {
                    return item.id !== payload.id
                }),
            ],
        }
    },
    [DELETE_DATA_ENTRY]: (
        state,
        {
            payload,
        },
    ) => {
        return {
            ...state,
            data: data.filter((item) => {
                return item.id !== payload.id
            }),
        }
    },
    [RERENDER_INFINIT_LIST]: (state) => {
        return {
            ...state,
            infinitListKey: uuid(),
        }
    },
    [SET_MATCHED_RESULTS]: (state, {
        meta: {
            matchedResults,
        },
    }) => {
        return {
            ...state,
            matchedResults,
        }
    },
}, initialState)

export default reducer
