import generateAsyncActions from 'utils/generateAsyncActions'

export const LOAD_DATA = generateAsyncActions('LOAD_DATA')
export const ADD_DATA_ENTRY = '[INFINITE LIST] ADD DATA ENTRY'
export const UPDATE_DATA_ENTRY = '[INFINITE LIST] UPDATE DATA ENTRY'
export const DELETE_DATA_ENTRY = '[INFINITE LIST] DELETE DATA ENTRY'

export function loadDataSuccess({
    meta, data,
}) {
    return {
        type: LOAD_DATA.success,
        meta,
        payload: data,
    }
}

export function loadDataPending(appName) {
    return {
        type: LOAD_DATA.pending,
        meta: {
            appName,
        },
    }
}

export function loadDataFailure(appName, err) {
    return {
        type: LOAD_DATA.failure,
        meta: {
            appName,
        },
        err,
    }
}

export function addDataEntry(appName, entry) {
    return {
        type: ADD_DATA_ENTRY,
        meta: {
            appName,
        },
        payload: entry,
    }
}

export function updateDataEntry(appName, entry) {
    return {
        type: UPDATE_DATA_ENTRY,
        meta: {
            appName,
        },
        payload: entry,
    }
}

export function deleteDataEntry(appName, entry) {
    return {
        type: DELETE_DATA_ENTRY,
        meta: {
            appName,
        },
        payload: entry,
    }
}
