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
    selectedRows: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
    ),
    uniqFieldValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    rowClick: PropTypes.func.isRequired,
    rowProps: PropTypes.shape({
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
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
    openRow: PropTypes.bool,
}

const defaultProps = {
    selectedRows: undefined,
    detailPanel: undefined,
    selectedRowId: undefined,
    rowProps: {},
    openRow: false,
}

const BaseRow = (props) => {
    const {
        name,
        selectedRows,
        selectedRowId,
        uniqFieldValue,
        rowClick,
        rowProps,
        columns,
        detailPanel: DetailPanel,
        openRow,
    } = props

    const classes = useStyles()

    const [
        isHide,
        setHide,
    ] = useState(!openRow)
    const togglePanel = useCallback(() => {
        setHide(!isHide)
    }, [isHide])

    const onRowClick = useCallback(() => {
        if (DetailPanel) {
            togglePanel()
        }

        rowClick(rowProps)
    }, [
        DetailPanel,
        togglePanel,
        rowClick,
        rowProps,
    ])

    return (
        <div
            data-testid={`richtable-row-${rowProps.id}`}
            className={clsx({
                [classes.selectedRow]: selectedRowId === uniqFieldValue,
            })}
        >
            <div
                onKeyDown={onRowClick}
                onClick={onRowClick}
                className={clsx(
                    classes.rowContent,
                    {
                        [classes.cursorPointer]: !selectedRows,
                    },
                )}
            >
                {
                    DetailPanel && (
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
                                data-testid={`cell-${id}`}
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
                DetailPanel && !isHide && (
                    <DetailPanel
                        name={name}
                        rowProps={rowProps}
                    />
                )
            }
        </div>
    )
}

BaseRow.propTypes = propTypes
BaseRow.defaultProps = defaultProps

export default BaseRow
