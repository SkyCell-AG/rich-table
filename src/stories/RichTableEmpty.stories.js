import React, {
    useCallback,
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
}

const defaultProps = {
    filter: undefined,
    onParamsChange: undefined,
    sort: undefined,
    visible: undefined,
}

const Template = (props) => {
    const richtableRef = useRef()

    const load = useCallback(() => {
        return Promise.resolve({
            meta: {
                matchedresults: 0,
            },
            data: [],
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

    const {
        filter,
        onParamsChange,
        sort,
        visible,
    } = props

    return (
        <DndProvider backend={HTML5Backend}>
            <RichTable
                ref={richtableRef}
                detailPanel={() => {
                    return <div>DetailPanel</div>
                }}
                columns={columns}
                renderEmptyMessage={() => {
                    return <div>Empty Message</div>
                }}
                renderFailureMessage={() => {
                    return <div>Failure Message</div>
                }}
                filter={filter}
                onParamsChange={onParamsChange}
                sort={sort}
                uniqField="uniqField"
                visible={visible}
                load={load}
            />
        </DndProvider>
    )
}

Template.propTypes = propTypes
Template.defaultProps = defaultProps

export const Empty = Template.bind({})
