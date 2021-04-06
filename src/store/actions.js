import generateAsyncActions from 'utils/generateAsyncActions'

export const LOAD_DATA = generateAsyncActions('LOAD_DATA')
export const ADD_DATA_ENTRY = '[INFINITE LIST] ADD DATA ENTRY'
export const UPDATE_DATA_ENTRY = '[INFINITE LIST] UPDATE DATA ENTRY'
export const DELETE_DATA_ENTRY = '[INFINITE LIST] DELETE DATA ENTRY'
export const SET_MATCHED_RESULTS = 'SET_MATCHED_RESULTS'
export const RERENDER_INFINIT_LIST = 'RERENDER_INFINIT_LIST'

export function loadDataSuccess({
    meta, data,
}) {
    return {
        type: LOAD_DATA.success,
        meta,
        payload: data,
    }
}

export function loadDataPending() {
    return {
        type: LOAD_DATA.pending,
    }
}

export function loadDataFailure(err) {
    return {
        type: LOAD_DATA.failure,
        err,
    }
}

export function addDataEntry(entry) {
    return {
        type: ADD_DATA_ENTRY,
        payload: entry,
    }
}

export function updateDataEntry(entry) {
    return {
        type: UPDATE_DATA_ENTRY,
        payload: entry,
    }
}

export function deleteDataEntry(entry) {
    return {
        type: DELETE_DATA_ENTRY,
        payload: entry,
    }
}

export function setMatchedResults(newMatchedResults) {
    return {
        type: SET_MATCHED_RESULTS,
        meta: {
            matchedResults: newMatchedResults,
        },
    }
}

export function rerenderInfinitList() {
    return {
        type: RERENDER_INFINIT_LIST,
    }
}
