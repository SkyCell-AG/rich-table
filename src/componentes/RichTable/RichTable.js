import React, {
    useCallback,
    useEffect,
    useRef,
} from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import noop from 'lodash/noop'
import get from 'lodash/get'
import {
    useTheme,
} from '@material-ui/core/styles'

import getComponentProps from 'utils/getComponentProps'

import BaseCell from 'componentes/BaseCell'
import HeaderCell from 'componentes/HeaderCell'
import InfiniteList from 'componentes/InfiniteList'
import DndCell from 'componentes/DndCell'

import useStyles from './RichTable.style'

const propTypes = {
    uniqField: PropTypes.string,
    name: PropTypes.string.isRequired,
    visible: PropTypes.arrayOf(PropTypes.string).isRequired,
    setVisible: PropTypes.func.isRequired,
    allColumns: PropTypes.arrayOf(PropTypes.object).isRequired,
    onRowClick: PropTypes.func,
    changeSequence: PropTypes.func.isRequired,
    setMatchedResults: PropTypes.func.isRequired,
    matchedResults: PropTypes.number,
    removeFilter: PropTypes.func.isRequired,
    removeSort: PropTypes.func.isRequired,
    rerenderInfinitList: PropTypes.func.isRequired,
    infinitListKey: PropTypes.string.isRequired,
    selectedRows: PropTypes.object, // eslint-disable-line
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            Header: PropTypes.func,
            Cell: PropTypes.func,
            props: PropTypes.object, // eslint-disable-line
        }).isRequired,
    ).isRequired,
    className: PropTypes.string,
    controlPanel: PropTypes.func,
    classNames: PropTypes.exact({
        root: PropTypes.string,
        contentWrapper: PropTypes.string,
        headerWrapper: PropTypes.string,
    }),
    editing: PropTypes.bool,
    selectedRowId: PropTypes.string,
}

const defaultProps = {
    matchedResults: undefined,
    className: '',
    onRowClick: noop,
    selectedRows: {},
    uniqField: 'id',
    controlPanel: null,
    classNames: {},
    editing: false,
    selectedRowId: '',
}

const RichTable = (props) => {
    const {
        columns,
        className: wrapperClassName,
        setMatchedResults,
        onRowClick,
        selectedRows,
        infinitListKey,
        rerenderInfinitList,
        changeSequence,
        uniqField,
        controlPanel: ControlPanel,
        classNames,
        editing,
        selectedRowId,
        name,
    } = props

    const theme = useTheme()
    const classes = useStyles(theme, props)

    const rowClick = useCallback((row) => {
        return () => {
            onRowClick(
                row,
                rerenderInfinitList,
            )
        }
    }, [
        onRowClick,
        rerenderInfinitList,
    ])

    const selectedElm = useRef()

    useEffect(() => {
        if (selectedRowId) {
            if (selectedElm.current.scrollIntoViewIfNeeded) {
                selectedElm.current.scrollIntoViewIfNeeded()
            } else {
                // IE, Firefox
                selectedElm.current.scrollIntoView()
            }
        }
    }, [selectedRowId])


    return (
        <div
            className={clsx(
                classNames.root,
                classes.tableWrapper,
                editing && classes.tableWrapperWhenEditing,
                wrapperClassName,
            )}
        >
            <div
                className={clsx(
                    classes.headerTableWrapper,
                    editing && classes.tableWrapperWhenEditing,
                    classNames.headerWrapper,
                )}
            >
                {ControlPanel && (
                    <ControlPanel
                        {...props}
                    />
                )}
            </div>

            <div
                className={clsx(
                    classes.contentWrapper,
                    editing && classes.contentWrapperWhenEditing,
                    classNames.contentWrapper,
                )}
            >
                <InfiniteList
                    {...props}
                    key={infinitListKey}
                    onUpdateMatchedResults={setMatchedResults}
                    beforeList={(
                        <div className={classes.headings}>
                            {columns.map(({
                                Header = HeaderCell,
                                mapHeaderProps = noop,
                                headerProps: headerPropsOut,
                                filterField,
                                id,
                                className: cellClassName,
                                width,
                                props: columnProps,
                                ...rest
                            }) => {
                                const headerProps = headerPropsOut || mapHeaderProps(columnProps)

                                return (
                                    <div
                                        key={`DndCell-${id}`}
                                        data-testid={`table-header-${id}`}
                                        className={clsx(
                                            classes.cell,
                                            cellClassName,
                                        )}
                                        style={{
                                            width,
                                        }}
                                    >
                                        <DndCell
                                            onDrop={changeSequence}
                                            id={id}
                                            type="HeaderCell"
                                        >
                                            <Header
                                                {...rest}
                                                {...columnProps}
                                                {...headerProps}
                                                key={`header-${id}`}
                                                id={filterField}
                                            />
                                        </DndCell>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                    Row={(rowProps) => {
                        const uniqFieldValue = get(rowProps, uniqField)
                        const rowSelected = selectedRows[uniqFieldValue]

                        return (
                            <div
                                data-test-id="richtable-row"
                                className={clsx({
                                    [classes.selectedRow]: selectedRowId === uniqFieldValue,
                                })}
                                ref={selectedRowId === uniqFieldValue ? selectedElm : null}
                                key={`row-${uniqFieldValue}`}
                                onKeyDown={rowClick(rowProps)}
                                onClick={rowClick(rowProps)}
                            >
                                <div
                                    className={clsx(
                                        classes.rowContent,
                                        {
                                            [classes.cursorPointer]: !Array.isArray(selectedRows),
                                        },
                                        {
                                            [classes.selectedRowContent]: rowSelected,
                                        },
                                    )}
                                >
                                    {columns.map(({
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
                                    })}
                                </div>
                            </div>
                        )
                    }}
                />
            </div>
        </div>
    )
}

RichTable.propTypes = propTypes
RichTable.defaultProps = defaultProps

export default RichTable
