import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'

import {
    ASC, DESC,
} from 'utils/sortDirection'

import styles from './SortIcons.module.css'

const propTypes = {
    value: PropTypes.oneOf([
        ASC,
        DESC,
        '',
    ]),
    className: PropTypes.string,
}
const defaultProps = {
    value: '',
    className: '',
}

const SortIcons = ({
    value, className,
}) => {
    return (
        <div className={styles.root}>
            {
                !value && (
                    <ArrowUpwardIcon
                        className={clsx([
                            'text-4xl',
                            styles.arrow,
                            className,
                        ])}
                        color="disabled"
                    />
                )
            }
            {
                value === ASC && (
                    <ArrowUpwardIcon
                        className={clsx([
                            'text-4xl',
                            styles.arrow,
                        ])}
                        color="inherit"
                    />
                )
            }
            {
                value === DESC && (
                    <ArrowDownwardIcon
                        className={clsx([
                            'text-4xl',
                            styles.arrow,
                        ])}
                        color="inherit"
                    />
                )
            }
        </div>
    )
}

SortIcons.propTypes = propTypes
SortIcons.defaultProps = defaultProps

export default SortIcons
