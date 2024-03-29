import createReducer from 'utils/createReducer'
import * as statuses from 'utils/requestStatuses'

import {
    LOAD_DATA,
    ADD_DATA_ENTRY,
    UPDATE_DATA_ENTRY,
    DELETE_DATA_ENTRY,
} from '../actions'

const initialState = {}

const inifiniteListReducer = createReducer({
    [LOAD_DATA.pending]: (state) => {
        return {
            ...state,
            status: statuses.PENDING,
        }
    },
    [LOAD_DATA.failure]: (
        state,
        err,
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
                page,
                matchedResults,
                hasNextPage,
            },
        }) => {
        return {
            ...state,
            status: statuses.SUCCESS,
            data: payload,
            page,
            matchedResults,
            hasNextPage,
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
            payload: {
                uniqField,
                entry,
            },
        },
    ) => {
        return {
            ...state,
            data: [
                entry,
                ...state.data.filter((item) => {
                    return item[uniqField] !== entry[uniqField]
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
            data: state.data.filter((item) => {
                return item.id !== payload.id
            }),
        }
    },
}, initialState)

export default inifiniteListReducer
