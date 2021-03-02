import React, {
    useCallback,
    useState,
} from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import noop from 'lodash/noop'
import get from 'lodash/get'
import ChevronRight from '@material-ui/icons/ChevronRight'

import getComponentProps from 'utils/getComponentProps'

import BaseCell from 'componentes/BaseCell'

import useStyles from './BaseRow.style'

const propTypes = {
    name: PropTypes.string.isRequired,
    selectedRows: PropTypes.object, // eslint-disable-line
    rowSelected: PropTypes.string,
    uniqFieldValue: PropTypes.string.isRequired,
    rowClick: PropTypes.func.isRequired,
    rowProps: PropTypes.shape({
        id: PropTypes.string,
    }),
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            Header: PropTypes.func,
            Cell: PropTypes.func,
            props: PropTypes.object, // eslint-disable-line
        }).isRequired,
    ).isRequired,
    detailPanel: PropTypes.func,
    selectedRowId: PropTypes.string,
}

const defaultProps = {
    selectedRows: {},
    detailPanel: undefined,
    rowSelected: undefined,
    selectedRowId: undefined,
    rowProps: {},
}

const BaseRow = (props) => {
    const {
        name,
        selectedRows,
        rowSelected,
        selectedRowId,
        uniqFieldValue,
        rowClick,
        rowProps,
        columns,
        detailPanel,
    } = props

    const classes = useStyles()

    const [
        isHide,
        setHide,
    ] = useState(true)
    const togglePanel = useCallback(() => {
        setHide(!isHide)
    }, [isHide])

    return (
        <div
            data-test-id={`richtable-row-${rowProps.id}`}
            className={clsx({
                [classes.selectedRow]: selectedRowId === uniqFieldValue,
            })}
        >
            <div
                onKeyDown={detailPanel ? togglePanel : rowClick(rowProps)}
                onClick={detailPanel ? togglePanel : rowClick(rowProps)}
                className={clsx(
                    classes.rowContent,
                    {
                        [classes.cursorPointer]: !Array.isArray(selectedRows),
                        [classes.selectedRowContent]: rowSelected,
                    },
                )}
            >
                {
                    detailPanel && (
                        <div className={classes.iconWrapper}>
                            <ChevronRight className={clsx(
                                {
                                    [classes.isOpenIcon]: !isHide,
                                },
                            )}
                            />
                        </div>
                    )
                }
                {
                    columns.map(({
                        Cell = BaseCell,
                        id,
                        width,
                        mapCellProps = noop,
                        component: Component,
                        propsMapper,
                        props: columnProps,
                    }) => {
                        const value = get(rowProps, mapCellProps)

                        const cellProps = typeof mapCellProps === 'string' ? {
                            children: Component
                                ? (
                                    <Component
                                        name={name}
                                        value={value}
                                        mapCellProps={mapCellProps}
                                        {...getComponentProps(
                                            propsMapper,
                                            rowProps,
                                        )}
                                    />
                                )
                                : value,
                        } : mapCellProps(rowProps)

                        return (
                            <div
                                style={{
                                    width,
                                }}
                                className={classes.cell}
                                key={`cell-${id}`}
                                data-test-id={`cell-${id}`}
                            >
                                <Cell
                                    id={id}
                                    {...rowProps}
                                    {...columnProps}
                                    {...cellProps}
                                />
                            </div>
                        )
                    })
                }
            </div>
            {
                detailPanel && !isHide && (
                    detailPanel({
                        name,
                        rowProps,
                    })
                )
            }
        </div>
    )
}

BaseRow.propTypes = propTypes
BaseRow.defaultProps = defaultProps

export default BaseRow
