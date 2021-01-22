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
    [LOAD_DATA.pending]: (state, {
        meta: {
            appName,
        },
    }) => {
        return {
            ...state,
            [appName]: {
                ...state[appName],
                status: statuses.PENDING,
            },
        }
    },
    [LOAD_DATA.failure]: (state, {
        meta: {
            appName,
        }, err,
    }) => {
        return {
            ...state,
            [appName]: {
                ...state[appName],
                status: statuses.FAILURE,
                err,
            },
        }
    },
    [LOAD_DATA.success]: (state,
        {
            payload, meta: {
                appName, page, matchedResults,
            },
        }) => {
        return {
            ...state,
            [appName]: {
                ...state[appName],
                status: statuses.SUCCESS,
                data: payload,
                page,
                matchedResults,
            },
        }
    },
    [ADD_DATA_ENTRY]: (state,
        {
            payload,
            meta: {
                appName,
            },
        }) => {
        return {
            ...state,
            [appName]: {
                ...state[appName],
                data: [
                    payload,
                    ...state[appName].data,
                ],
            },
        }
    },
    [UPDATE_DATA_ENTRY]: (
        state,
        {
            payload,
            meta: {
                appName,
            },
        },
    ) => {
        return {
            ...state,
            [appName]: {
                ...state[appName],
                data: [
                    payload,
                    ...state[appName].data.filter((item) => {
                        // TODO remove this after new domain api is implementend everywhere
                        if (item.contentid) {
                            return item.contentid !== payload.contentid
                        }

                        return item.id !== payload.id
                    }),
                ],
            },
        }
    },
    [DELETE_DATA_ENTRY]: (
        state,
        {
            payload,
            meta: {
                appName,
            },
        },
    ) => {
        return {
            ...state,
            [appName]: {
                ...state[appName],
                data: state[appName].data.filter((item) => {
                    return item.id !== payload.id
                }),
            },
        }
    },
}, initialState)

export default inifiniteListReducer
