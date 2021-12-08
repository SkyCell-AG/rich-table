import React, {
    useCallback,
    useEffect,
    useRef,
    forwardRef,
    useLayoutEffect,
    useReducer,
    useMemo,
} from 'react'
import noop from 'lodash/noop'
import get from 'lodash/get'
import PropTypes from 'prop-types'

import * as statuses from 'utils/requestStatuses'
import createCancelablePromise from 'utils/createCancelablePromise'

import {
    loadDataSuccess,
    loadDataFailure,
    loadDataPending,
    updateDataEntry,
    addDataEntry,
} from './store/actions'
import reducer from './store/reducer'
import InfiniteList from './InfiniteList'

const propTypes = {
    Row: PropTypes.func.isRequired,
    uniqField: PropTypes.string,
    load: PropTypes.func.isRequired,
    onUpdateMatchedResults: PropTypes.func,
}

const defaultProps = {
    onUpdateMatchedResults: noop,
    uniqField: 'id',
}

const InfiniteListContainer = forwardRef((props, ref) => {
    const {
        load,
        onUpdateMatchedResults,
        uniqField,
        Row,
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
        page: 0,
    })

    useEffect(() => {
        ref.current = { // eslint-disable-line
            update: (updatedElement) => {
                dispatch(updateDataEntry(updatedElement, uniqField))
            },
            add: (updatedElement) => {
                dispatch(addDataEntry(updatedElement))
            },
        }
    }, [
        ref,
        uniqField,
    ])

    const wrapperRef = useRef(null)
    const spacerRef = useRef(null)
    const cancelRequest = useRef(null)

    const hasMore = useMemo(() => {
        return data.length < matchedResults
    }, [
        data.length,
        matchedResults,
    ])

    const loadNewPage = useCallback((oldVal, newPage) => {
        dispatch(loadDataPending())

        const [
            request,
            cancel,
        ] = createCancelablePromise(load(newPage))

        cancelRequest.current = cancel

        request
            .then((response) => {
                if (!get(response, 'data') || get(response, 'meta.matchedresults') === undefined) {
                    throw new Error('Not valid response')
                }

                return response
            })
            .then(({
                data: newPageData,
                meta: {
                    matchedresults,
                },
            }) => {
                cancelRequest.current = null
                dispatch(loadDataSuccess({
                    meta: {
                        page: newPage,
                        matchedResults: matchedresults,
                    },
                    data: [
                        ...oldVal,
                        ...newPageData,
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
            Row={Row}
            wrapperRef={wrapperRef}
            spacerRef={spacerRef}
            hasMore={hasMore}
            data={data}
            status={status}
            loadNextPage={loadNextPage}
            onScroll={status === statuses.SUCCESS || statuses.PRISTIN ? onScroll : noop}
        />
    )
})

InfiniteListContainer.propTypes = propTypes
InfiniteListContainer.defaultProps = defaultProps

export default InfiniteListContainer
