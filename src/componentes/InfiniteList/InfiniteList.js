import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
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
    status: requestType.isRequired,
    onScroll: PropTypes.func.isRequired,
    className: PropTypes.string,
    canCreate: PropTypes.bool,
    Row: PropTypes.func.isRequired,
    BeforeList: PropTypes.func,
}

const defaultProps = {
    data: [],
    className: '',
    canCreate: false,
    BeforeList: null,
}

const InfiniteList = ({
    data,
    status,
    onScroll,
    wrapperRef, // eslint-disable-line
    spacerRef, // eslint-disable-line
    canCreate,
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
                <div className={classes.container}>
                    <div className={classes.noDataWrapper}>
                        <div className={classes.noDataImage}>
                            <img
                                className={classes.noDataImage}
                                src="assets/images/robots/dataNotLoad.png"
                                alt="dataNotLoad"
                            />
                        </div>
                        <div className={classes.noDataContainer}>
                            <div className={classes.noData}>
                                Ouups, we&apos;re sorry - it seems we can&apos;t find the data that
                                should show here.
                                Please contact your colleagues in IT if you need help!
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {SUCCESS === status && data.length === 0 && (
                <div className={classes.container}>
                    <div className={classes.noDataWrapper}>
                        <div className={classes.noDataImage}>
                            <img
                                className={classes.noDataImage}
                                src="assets/images/robots/noDataImage.png"
                                alt="noDataImage"
                            />
                        </div>
                        <div className={classes.noDataContainer}>
                            <div className={classes.noData}>
                                It looks like there is no data in this table yet.
                                {' '}
                                {canCreate ? <span>Why don&apos;t you create a new record by clicking the + button?</span> : ''}
                            </div>
                        </div>
                    </div>
                </div>
            )}
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
