import React, {
    useCallback,
    useEffect,
    useRef,
    useLayoutEffect,
    useReducer,
} from 'react'
import noop from 'lodash/noop'
import get from 'lodash/get'
import PropTypes from 'prop-types'

import * as statuses from 'utils/requestStatuses'
import createCancelablePromise from 'utils/createCancelablePromise'

import {
    loadDataSuccess, loadDataFailure, loadDataPending,
} from './store/actions'
import reducer from './store/reducer'
import InfiniteList from './InfiniteList'

const propTypes = {
    load: PropTypes.func.isRequired,
    onUpdateMatchedResults: PropTypes.func,
}

const defaultProps = {
    onUpdateMatchedResults: noop,
}

const InfiniteListContainer = (props) => {
    const {
        load,
        onUpdateMatchedResults,
    } = props

    const [
        {
          data,
          matchedResults,
          status,
          page,
        },
        dispatch,
    ] = useReducer(reducer, {
        status: statuses.PRISTIN,
        data: [],
        matchedResults: 0,
    })

    const wrapperRef = useRef(null)
    const spacerRef = useRef(null)
    const cancelRequest = useRef(null)

    const hasMore = data.length < matchedResults

    const loadNewPage = useCallback((oldVal, page) => {
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

    const loadNextPage = useCallback(() => {
        loadNewPage(data, page + 1)
    }, [
        loadNewPage,
        data,
        page,
    ])

    const onScroll = useCallback(({
        target,
    }) => {
        if (
            status === statuses.PENDING
            || !hasMore
            || target !== wrapperRef.current
            || target.scrollHeight - target.scrollTop > target.offsetHeight * 1.2
        ) {
            return
        }

        loadNextPage()
    }, [
        status,
        hasMore,
        loadNextPage,
    ])

    useEffect(() => {
        if (cancelRequest.current) {
            cancelRequest.current()
        }

        loadNewPage([], 1)
    }, [loadNewPage])

    useEffect(() => {
        onUpdateMatchedResults(matchedResults)
    }, [
        onUpdateMatchedResults,
        matchedResults,
    ])

    useLayoutEffect(() => {
        if (status !== statuses.SUCCESS) {
            return
        }

        const wrapper = wrapperRef.current
        const spacer = spacerRef.current

        if (!hasMore) {
            spacer.style.height = '0px'
            return
        }

        const {
            height: wrapperHeight,
        } = wrapper.getBoundingClientRect()

        const children = [...wrapper.childNodes]
        const childrenHeight = children.reduce((sum, element) => {
            if (element === spacer) {
                return sum
            }

            const {
                height,
            } = element.getBoundingClientRect()

            return sum + height
        }, 0)

        const heightDiff = wrapperHeight - childrenHeight

        if (heightDiff > 0) {
            spacer.style.height = `${heightDiff + 20}px`
        } else {
            spacer.style.height = '0px'
        }
    }, [
        data,
        status,
        hasMore,
    ])

    return (
        <InfiniteList
            {...props}
            wrapperRef={wrapperRef}
            spacerRef={spacerRef}
            hasMore={hasMore}
            data={data}
            status={status}
            loadNextPage={loadNextPage}
            onScroll={status === statuses.SUCCESS || statuses.PRISTIN ? onScroll : noop}
        />
    )
}

InfiniteListContainer.propTypes = propTypes
InfiniteListContainer.defaultProps = defaultProps

export default InfiniteListContainer
