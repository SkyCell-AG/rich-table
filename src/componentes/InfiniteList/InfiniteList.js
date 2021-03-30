import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import CircularProgress from '@material-ui/core/CircularProgress'
import SnackbarContent from '@material-ui/core/SnackbarContent'

import {
    PENDING,
    FAILURE,
    SUCCESS,
    requestType,
} from 'utils/requestStatuses'

import styles from './InfiniteList.module.css'

const propTypes = {
    data: PropTypes.array.isRequired, // eslint-disable-line
    status: requestType.isRequired,
    onScroll: PropTypes.func.isRequired,
    className: PropTypes.string,
    Row: PropTypes.func.isRequired,
    BeforeList: PropTypes.element,
}

const defaultProps = {
    className: '',
    BeforeList: null,
}

const InfiniteList = ({
    data = [],
    status,
    onScroll,
    wrapperRef, // eslint-disable-line
    spacerRef, // eslint-disable-line
    className,
    BeforeList,
    Row,
}) => {
    return (
        <div
            onScroll={onScroll}
            ref={wrapperRef}
            className={clsx(styles.wrapper, className)}
        >
            {status === FAILURE && (
                <SnackbarContent
                    className={styles.failureMessage}
                    message="Failed to load data"
                />
            )}
            <BeforeList data={data} />
            {SUCCESS === status && data.length === 0 && (
                <div>
                    No data to show
                </div>
            )}
            {data.map(Row)}
            {status === PENDING && (
                <CircularProgress
                    className={styles.loader}
                    size={40}
                />
            )}
            <div ref={spacerRef} />
        </div>
    )
}

InfiniteList.propTypes = propTypes
InfiniteList.defaultProps = defaultProps

export default InfiniteList
