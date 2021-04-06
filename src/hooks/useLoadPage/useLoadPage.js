import {
    useCallback,
    useRef,
} from 'react'
import get from 'lodash/get'

import createCancelablePromise from 'utils/createCancelablePromise'
import {
    loadDataSuccess,
    loadDataFailure,
    loadDataPending,
    setMatchedResults,
    rerenderInfinitList,
} from 'store/actions'

const useLoadPage = (load, dispatch) => {
    const cancelRequest = useRef(null)

    const loadPage = useCallback((oldVal, page) => {
        
        dispatch(loadDataPending())

        const [
            request,
            cancel,
        ] = createCancelablePromise(load(page))

        cancelRequest.current = cancel

        request
            .then((response) => {
                if (!get(response, 'data') || get(response, 'meta.matchedresults') === undefined) {
                    throw new Error('Not valid response')
                }

                return response
            })
            .then(({
                data,
                meta: {
                    matchedresults,
                },
            }) => {
                cancelRequest.current = null
                dispatch(loadDataSuccess({
                    meta: {
                        page,
                        matchedResults: matchedresults,
                    },
                    data: [
                        ...oldVal,
                        ...data,
                    ],
                }))
            })
            .catch((err) => {
                if (err.message === 'canceled') {
                    return
                }

                dispatch(loadDataFailure(err))
            })
    }, [
        load,
        dispatch,
    ])

    const handleSetMatchedResults = useCallback((newMatchedResults) => {
        dispatch(setMatchedResults(newMatchedResults))
    }, [dispatch])

    const handleRerenderInfinitList = useCallback(() => {
        dispatch(rerenderInfinitList())
    }, [dispatch])

    return {
        loadPage,
        handleSetMatchedResults,
        handleRerenderInfinitList,
    }
}

export default useLoadPage
