import React, {
    useCallback,
    useEffect,
    useRef,
    useLayoutEffect,
    useReducer,
    useMemo,
} from 'react'
import noop from 'lodash/noop'
import PropTypes from 'prop-types'

import * as statuses from 'utils/requestStatuses'

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
        data,
        matchedResults,
        status,
        page,
    } = props

    const wrapperRef = useRef(null)
    const spacerRef = useRef(null)

    const hasMore = useMemo(() => {
        return data.length < matchedResults
    },[
        data.length,
        matchedResults,
    ])

    const loadNextPage = useCallback(() => {
        load(data, page + 1)
    }, [
        load,
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
