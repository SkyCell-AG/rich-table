import PropTypes from 'prop-types'

export const PRISTIN = 'PRISTIN'
export const PENDING = 'PENDING'
export const SUCCESS = 'SUCCESS'
export const FAILURE = 'FAILURE'

export const requestType = PropTypes.oneOf([
    PRISTIN,
    PENDING,
    SUCCESS,
    FAILURE,
])
