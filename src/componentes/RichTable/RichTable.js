import React, {
    useCallback,
    forwardRef,
    useEffect,
    useState,
    useRef,
} from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import noop from 'lodash/noop'
import get from 'lodash/get'
import {
    useTheme,
} from '@mui/material/styles'

import HeaderCell from 'componentes/HeaderCell'
import InfiniteList from 'componentes/InfiniteList'
import DndCell from 'componentes/DndCell'
import BaseRow from 'componentes/BaseRow'

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
    selectedRows: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
    ),
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
    detailPanel: PropTypes.func,
    openRowId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
}

const defaultProps = {
    matchedResults: undefined,
    className: '',
    onRowClick: undefined,
    selectedRows: undefined,
    uniqField: 'id',
    controlPanel: null,
    classNames: {},
    editing: false,
    selectedRowId: '',
    detailPanel: undefined,
    openRowId: undefined,
}

const RichTable = forwardRef((props, ref) => {
    const {
        columns,
        className: wrapperClassName,
        setMatchedResults,
        onRowClick,
        selectedRows,
        infinitListKey,
        changeSequence,
        uniqField,
        controlPanel: ControlPanel,
        classNames,
        editing,
        selectedRowId,
        name,
        detailPanel,
        rerenderInfinitList,
        openRowId,
    } = props

    const theme = useTheme()
    const classes = useStyles(theme, props)

    const [
        openedRow,
        setOpenedRow,
    ] = useState(null)

    const closeOpenedRow = useCallback(() => {
        setOpenedRow(null)
    }, [])

    const rowClick = useCallback((row) => {
        return () => {
            if (onRowClick) {
                onRowClick(
                    row,
                    rerenderInfinitList,
                )
            } else if (detailPanel) {
                setOpenedRow(openedRow === row ? null : row)
            }
        }
    }, [
        openedRow,
        onRowClick,
        detailPanel,
        rerenderInfinitList,
    ])

    const selectedElm = useRef()

    useEffect(() => {
        if (selectedRowId && selectedElm.current) {
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
                    ref={ref}
                    key={infinitListKey}
                    onUpdateMatchedResults={setMatchedResults}
                    BeforeList={({
                        data,
                    }) => {
                        return (
                            <div className={clsx(
                                classes.headings,
                                {
                                    [classes.withDetailPanel]: detailPanel,
                                },
                            )}
                            >
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
                                    const headerProps = headerPropsOut
                                    || mapHeaderProps({
                                        ...columnProps,
                                        data,
                                    })

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
                                                {...headerProps}
                                                onDrop={changeSequence}
                                                id={id}
                                                type="HeaderCell"
                                                data={data}
                                            >
                                                <Header
                                                    {...rest}
                                                    {...columnProps}
                                                    {...headerProps}
                                                    data={data}
                                                    key={`header-${id}`}
                                                    id={filterField}
                                                />
                                            </DndCell>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    }}
                    Row={(rowProps) => {
                        const uniqFieldValue = get(rowProps, uniqField)
                        const innerOpenRowId = get(openedRow, uniqField)

                        const openRow = (
                            openRowId === uniqFieldValue
                            || innerOpenRowId === uniqFieldValue
                        )

                        return (
                            <div
                                ref={selectedRowId === uniqFieldValue ? selectedElm : null}
                                key={`row-${uniqFieldValue}`}
                            >
                                <BaseRow
                                    name={name}
                                    selectedRows={selectedRows}
                                    selectedRowId={selectedRowId}
                                    uniqFieldValue={uniqFieldValue}
                                    rowClick={rowClick(rowProps)}
                                    rowProps={rowProps}
                                    columns={columns}
                                    detailPanel={detailPanel}
                                    openRow={openRow}
                                    closeOpenedRow={closeOpenedRow}
                                />
                            </div>
                        )
                    }}
                />
            </div>
        </div>
    )
})

RichTable.propTypes = propTypes
RichTable.defaultProps = defaultProps

export default RichTable
