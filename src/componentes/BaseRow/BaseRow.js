import React, {
    useMemo,
} from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import noop from 'lodash/noop'
import get from 'lodash/get'
import ChevronRight from '@mui/icons-material/ChevronRight'

import getComponentProps from 'utils/getComponentProps'

import BaseCell from 'componentes/BaseCell'

import useStyles from './BaseRow.style'

const propTypes = {
    name: PropTypes.string.isRequired,
    configName: PropTypes.string,
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
    rowClick: PropTypes.func,
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
    selectedRowId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    openRow: PropTypes.bool,
    closeOpenedRow: PropTypes.func.isRequired,
    rowStyle: PropTypes.shape({
        crossLine: PropTypes.string,
    }),
    disabled: PropTypes.bool,
}

const defaultProps = {
    rowClick: undefined,
    selectedRows: undefined,
    detailPanel: undefined,
    selectedRowId: undefined,
    rowStyle: undefined,
    rowProps: {},
    openRow: false,
    disabled: false,
    configName: undefined,
}

const BaseRow = (props) => {
    const {
        name,
        configName,
        selectedRows,
        selectedRowId,
        uniqFieldValue,
        rowClick,
        rowProps,
        columns,
        detailPanel: DetailPanel,
        openRow,
        closeOpenedRow,
        rowStyle,
        disabled,
    } = props

    const classes = useStyles()

    const showDetailPanel = useMemo(() => {
        return DetailPanel && openRow
    }, [
        DetailPanel,
        openRow,
    ])

    return (
        <div
            data-testid={`richtable-row-${uniqFieldValue}`}
            className={clsx({
                [classes.selectedRow]: selectedRowId === uniqFieldValue,
                [classes.cursorPointer]: Boolean(rowClick),
            })}
        >
            <div
                onKeyDown={rowClick}
                onClick={rowClick}
                className={clsx(
                    classes.rowContent,
                    {
                        [classes.cursorPointer]: !selectedRows,
                        [classes.disabled]: disabled,
                    },
                )}
            >
                {
                    rowStyle?.crossLine
                    && rowProps[rowStyle.crossLine]
                    && <div className={classes.crossLine} />
                }
                {
                    DetailPanel && (
                        <div className={classes.iconWrapper}>
                            <ChevronRight
                                className={clsx(
                                    classes.iconChevron,
                                    {
                                        [classes.isOpenIcon]: showDetailPanel,
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
                        minWidth = '',
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
                                        configName={configName}
                                        value={value}
                                        rowProps={rowProps}
                                        mapCellProps={mapCellProps}
                                        {...getComponentProps(
                                            propsMapper,
                                            rowProps,
                                        )}
                                    />
                                )
                                : value,
                        } : mapCellProps(rowProps)

                        const divStyles = width ? {
                            display: 'flex',
                            flex: `0 0 ${width}`,
                            minWidth: `${minWidth}`,
                        } : {
                            minWidth: `${minWidth}`,
                        }

                        return (
                            <div
                                style={divStyles}
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
                showDetailPanel && (
                    <DetailPanel
                        name={name}
                        rowProps={rowProps}
                        closeOpenedRow={closeOpenedRow}
                    />
                )
            }
        </div>
    )
}

BaseRow.propTypes = propTypes
BaseRow.defaultProps = defaultProps

export default BaseRow
