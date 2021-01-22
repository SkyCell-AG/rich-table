import React, {
    useCallback,
    useEffect,
    useRef,
    useLayoutEffect,
} from 'react'
import {
    useSelector, useDispatch,
} from 'react-redux'
import noop from 'lodash/noop'
import get from 'lodash/get'
import PropTypes from 'prop-types'

import * as statuses from 'utils/requestStatuses'
import createCancelablePromise from 'utils/createCancelablePromise'

import {
    loadDataSuccess, loadDataFailure, loadDataPending,
} from './store/actions'
import InfiniteList from './InfiniteList'

const propTypes = {
    load: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onUpdateMatchedResults: PropTypes.func,
}

const defaultProps = {
    onUpdateMatchedResults: noop,
}

const defaultState = {
    status: statuses.PRISTIN,
    data: [],
    matchedResults: 0,
}

const InfiniteListContainer = (props) => {
    const {
        load,
        name,
        onUpdateMatchedResults,
    } = props

    const dispatch = useDispatch()
    const state = useSelector(({
        infiniteList,
    }) => {
        return {
            ...defaultState,
            ...infiniteList[name],
        }
    })

    const wrapperRef = useRef(null)
    const spacerRef = useRef(null)
    const cancelRequest = useRef(null)

    const hasMore = state.data.length < state.matchedResults

    const loadNewPage = useCallback((oldVal, page) => {
        dispatch(loadDataPending(name))

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
                        appName: name,
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

                dispatch(loadDataFailure(name, err))
            })
    }, [
        name,
        load,
        dispatch,
    ])

    const loadNextPage = useCallback(() => {
        loadNewPage(state.data, state.page + 1)
    }, [
        loadNewPage,
        state.data,
        state.page,
    ])

    const onScroll = useCallback(({
        target,
    }) => {
        if (
            state.status === statuses.PENDING
            || !hasMore
            || target !== wrapperRef.current
            || target.scrollHeight - target.scrollTop > target.offsetHeight * 1.2
        ) {
            return
        }

        loadNextPage()
    }, [
        state.status,
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
        onUpdateMatchedResults(state.matchedResults)
    }, [
        onUpdateMatchedResults,
        state.matchedResults,
    ])

    useLayoutEffect(() => {
        if (state.status !== statuses.SUCCESS) {
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
        state.data,
        state.status,
        hasMore,
    ])

    return (
        <InfiniteList
            {...props}
            wrapperRef={wrapperRef}
            spacerRef={spacerRef}
            hasMore={hasMore}
            data={state.data}
            status={state.status}
            loadNextPage={loadNextPage}
            onScroll={state.status === statuses.SUCCESS || statuses.PRISTIN ? onScroll : noop}
        />
    )
}

InfiniteListContainer.propTypes = propTypes
InfiniteListContainer.defaultProps = defaultProps

export default InfiniteListContainer
