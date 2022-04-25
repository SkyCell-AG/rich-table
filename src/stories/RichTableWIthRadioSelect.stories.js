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
    selectedRows: PropTypes.arrayOf(PropTypes.number),
}

const defaultProps = {
    selectedRows: [],
}

const Template = (props) => {
    const {
        selectedRows: selectedRowsFromProps,
    } = props

    const [
        selectedRows,
        setSelectedRows,
    ] = useState()

    useEffect(() => {
        setSelectedRows(selectedRowsFromProps)
    }, [selectedRowsFromProps])

    const richtableRef = useRef()

    const localSetSelectedRows = useCallback((params) => {
        setSelectedRows(params)
    }, [])

    const load = useCallback(() => {
        return Promise.resolve({
            meta: {
                matchedresults: 1000,
            },
            data: (new Array(20).fill(0).map((val, index) => {
                return {
                    uniqField: index,
                    field1: `field1: ${index}; tab: 0`,
                    field2: `Field 2: ${index}`,
                    field3: `Field 3: ${index}`,
                }
            })),
        })
    }, [])

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

    return (
        <DndProvider backend={HTML5Backend}>
            <button
                type="button"
                onClick={() => {
                    return setSelectedRows([5])
                }}
            >
                change selected rows
            </button>
            <RichTable
                ref={richtableRef}
                detailPanel={() => {
                    return <div>DetailPanel</div>
                }}
                columns={columns}
                uniqField="uniqField"
                load={load}
                onSelectRow={localSetSelectedRows}
                selectedRows={selectedRows}
                radioSelect
            />
        </DndProvider>
    )
}

Template.propTypes = propTypes
Template.defaultProps = defaultProps

export const Radio = Template.bind({})
Radio.args = {
    selectedRows: [
        3,
        5,
    ],
}
