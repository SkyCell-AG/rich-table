import React, {
    useCallback,
    useEffect,
    useState,
    useMemo,
    useRef,
} from 'react'
import PropTypes from 'prop-types'
import {
    DndProvider,
} from 'react-dnd'
import {
    HTML5Backend,
} from 'react-dnd-html5-backend'

import RichTable from 'componentes/RichTable'

export default {
    title: 'Example/RichTable',
    component: RichTable,
    argTypes: {},
}

const propTypes = {
    filter: PropTypes.object, // eslint-disable-line
    onParamsChange: PropTypes.func, // eslint-disable-line
    sort: PropTypes.object, // eslint-disable-line
    visible: PropTypes.arrayOf(PropTypes.string), // eslint-disable-line
    selectedRows: PropTypes.arrayOf(PropTypes.number),
}

const defaultProps = {
    selectedRows: [],
    filter: undefined,
    onParamsChange: undefined,
    sort: undefined,
    visible: undefined,
}

const Template = (props) => {
    const {
        selectedRows: selectedRowsFromProps,
    } = props

    const [
        tab,
        setTab,
    ] = useState(0)
    const [
        selectedRows,
        setSelectedRows,
    ] = useState()

    const [
        disabled,
        setDisabled,
    ] = useState(false)

    useEffect(() => {
        setSelectedRows(selectedRowsFromProps)
    }, [selectedRowsFromProps])

    const richtableRef = useRef()

    const load = useCallback(() => {
        return Promise.resolve({
            meta: {
                matchedresults: 1000,
            },
            data: (new Array(20).fill(0).map((val, index) => {
                return {
                    uniqField: index,
                    field1: `field1: ${index}; tab: ${tab}`,
                    field2: `Field 2: ${index}`,
                    field3: `Field 3: ${index}`,
                }
            })),
        })
    }, [tab])

    const columns = useMemo(() => {
        return [
            {
                id: 'field1',
                filterField: 'field1',
                width: '10%',
                mapHeaderProps: () => {
                    return {
                        children: 'Field 1',
                    }
                },
                mapCellProps: 'field1',
            },
            {
                id: 'field2',
                filterField: 'field2',
                width: '60px',
                mapHeaderProps: () => {
                    return {
                        children: 'Field 2',
                    }
                },
                mapCellProps: 'field2',
            },
            {
                id: 'field3',
                filterField: 'field3',
                mapHeaderProps: () => {
                    return {
                        children: 'Field 3',
                    }
                },
                mapCellProps: 'field3',
            },
        ]
    }, [])

    const {
        filter,
        onParamsChange,
        sort,
        visible,
    } = props

    return (
        <DndProvider backend={HTML5Backend}>
            <button
                type="button"
                onClick={() => {
                    return setSelectedRows([
                        0,
                        5,
                    ])
                }}
            >
                change selected rows
            </button>
            <button
                type="button"
                onClick={() => {
                    return richtableRef.current && richtableRef.current.add(
                        {
                            uniqField: 2,
                            field1: tab,
                            field2: 'Field 2 updated content 2',
                            field3: 'Field 3 content 2',
                        },
                    )
                }}
            >
                add
            </button>
            <button
                type="button"
                onClick={() => {
                    return richtableRef.current && richtableRef.current.update(
                        {
                            uniqField: 2,
                            field1: tab,
                            field2: 'Field 2 updated content 2',
                            field3: 'Field 3 content 2',
                        },
                    )
                }}
            >
                update
            </button>
            <div>
                <button
                    type="button"
                    onClick={() => { setTab(0) }}
                >
                    Tab 1
                </button>
                <button
                    type="button"
                    onClick={() => { setTab(1) }}
                >
                    Tab 2
                </button>
                <button
                    type="button"
                    onClick={() => { setTab(2) }}
                >
                    Tab 3
                </button>
                <button
                    type="button"
                    onClick={() => { setDisabled(!disabled) }}
                >
                    Disabled
                </button>
            </div>
            <RichTable
                ref={richtableRef}
                detailPanel={() => {
                    return <div>DetailPanel</div>
                }}
                columns={columns}
                filter={filter}
                onParamsChange={onParamsChange}
                onSelectRow={setSelectedRows}
                sort={sort}
                uniqField="uniqField"
                visible={visible}
                load={load}
                selectedRows={selectedRows}
                disabled={disabled}
            />
        </DndProvider>
    )
}

Template.propTypes = propTypes
Template.defaultProps = defaultProps

export const Primary = Template.bind({})
Primary.args = {
    selectedRows: [
        0,
        3,
        5,
    ],
}
