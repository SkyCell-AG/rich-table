import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import noop from 'lodash/noop'
import CircularProgress from '@mui/material/CircularProgress'

import {
    PENDING,
    FAILURE,
    SUCCESS,
    requestType,
} from 'utils/requestStatuses'

import useStyles from './InfiniteList.style'

const propTypes = {
    data: PropTypes.array, // eslint-disable-line
    renderFailureMessage: PropTypes.func,
    renderEmptyMessage: PropTypes.func,
    status: requestType.isRequired,
    onScroll: PropTypes.func.isRequired,
    className: PropTypes.string,
    Row: PropTypes.func.isRequired,
    BeforeList: PropTypes.func,
}

const defaultProps = {
    data: [],
    className: '',
    BeforeList: null,
    renderEmptyMessage: noop,
    renderFailureMessage: noop,
}

const InfiniteList = ({
    data,
    status,
    onScroll,
    wrapperRef, // eslint-disable-line
    spacerRef, // eslint-disable-line
    renderFailureMessage,
    renderEmptyMessage,
    className,
    BeforeList,
    Row,
}) => {
    const classes = useStyles()

    return (
        <div
            onScroll={onScroll}
            ref={wrapperRef}
            className={clsx(classes.wrapper, className)}
            data-testid="infinitelist"
        >
            {BeforeList && <BeforeList data={data} />}
            {status === FAILURE && renderFailureMessage()}
            {(status === SUCCESS && data.length === 0) && renderEmptyMessage()}
            {data.map(Row)}
            {status === PENDING && (
                <div className={classes.pendingContainer}>
                    <CircularProgress
                        className={classes.loader}
                        size={40}
                    />
                </div>
            )}
            <div ref={spacerRef} />
        </div>
    )
}

InfiniteList.propTypes = propTypes
InfiniteList.defaultProps = defaultProps

export default InfiniteList
