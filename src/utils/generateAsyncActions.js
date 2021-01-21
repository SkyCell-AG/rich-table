import * as statuses from './requestStatuses'

function generateAsyncActions(name) {
    return {
        pending: `${statuses.PENDING}_${name}`,
        success: `${statuses.SUCCESS}_${name}`,
        failure: `${statuses.FAILURE}_${name}`,
    }
}

export default generateAsyncActions
