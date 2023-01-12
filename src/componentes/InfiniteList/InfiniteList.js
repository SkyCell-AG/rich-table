import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import CircularProgress from '@mui/material/CircularProgress'
// import SnackbarContent from '@mui/material/SnackbarContent'

import {
    PENDING,
    FAILURE,
    SUCCESS,
    requestType,
} from 'utils/requestStatuses'

import useStyles from './InfiniteList.style'

const propTypes = {
    data: PropTypes.array, // eslint-disable-line
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
}

const InfiniteList = ({
    data,
    status,
    onScroll,
    wrapperRef, // eslint-disable-line
    spacerRef, // eslint-disable-line
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
            {status === FAILURE && (
                <div className={classes.noDataContainer}>
                    <div className={classes.noData}>
                        Something went wrong and the data could not be loaded.
                    </div>
                </div>
            )}
            {SUCCESS === status && data.length === 0 && (
                <div className={classes.noDataContainer}>
                    <div className={classes.noData}>
                        There is no data in this table yet.
                    </div>
                </div>
            )}
            {data.map(Row)}
            {status === PENDING && (
                <CircularProgress
                    className={classes.loader}
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
