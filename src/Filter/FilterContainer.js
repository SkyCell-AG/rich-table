import React, {
    useReducer,
    useCallback,
} from 'react'
import PropTypes from 'prop-types'

import createReducer from 'utils/createReducer'
import * as statuses from 'utils/requestStatuses'
import generateAsyncActions from 'utils/generateAsyncActions'

import Filter from './Filter'

const INPUT_SEARCH_PHRASE = 'INPUT_SEARCH_PHRASE'
const LOAD_FILTERS = generateAsyncActions('LOAD_FILTERS')

const reducer = createReducer({
    [INPUT_SEARCH_PHRASE]: (state, {
        meta: {
            searchPhrase,
        },
    }) => {
        return {
            ...state,
            searchPhrase,
        }
    },
    [LOAD_FILTERS.pending]: (state) => {
        return {
            ...state,
            status: statuses.PENDING,
        }
    },
    [LOAD_FILTERS.failure]: (state, {
        err,
    }) => {
        return {
            ...state,
            status: statuses.FAILURE,
            err,
        }
    },
    [LOAD_FILTERS.success]: (state, {
        payload,
    }) => {
        return {
            ...state,
            status: statuses.SUCCESS,
            filters: payload,
        }
    },
})

const initState = {
    status: statuses.PRISTIN,
    err: null,
    filters: [],
    searchPhrase: '',
}

const propTypes = {
    loadFilters: PropTypes.func.isRequired,
}

const FilterContainer = (props) => {
    const {
        loadFilters,
    } = props

    const [
        state,
        dispatch,
    ] = useReducer(reducer, initState)

    const setSearchPhrase = useCallback((searchPhrase) => {
        dispatch({
            type: INPUT_SEARCH_PHRASE,
            meta: {
                searchPhrase,
            },
        })
    }, [])

    const load = useCallback(() => {
        dispatch({
            type: LOAD_FILTERS.pending,
        })
        loadFilters()
            .then((data) => {
                dispatch({
                    type: LOAD_FILTERS.success,
                    payload: data,
                })
            })
            .catch((err) => {
                dispatch({
                    type: LOAD_FILTERS.failure,
                    err,
                })
            })
    }, [loadFilters])

    return (
        <Filter
            {...props}
            searchPhrase={state.searchPhrase}
            setSearchPhrase={setSearchPhrase}
            status={state.status}
            filters={state.filters}
            load={load}
        />
    )
}

FilterContainer.propTypes = propTypes

export default FilterContainer
