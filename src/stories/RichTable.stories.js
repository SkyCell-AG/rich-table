import React, {
    useCallback,
    useState,
    useRef,
} from 'react'
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

const Template = (args) => {
    const [
        tab,
        setTab,
    ] = useState(0)

    const richtableRef = useRef()

    const load = useCallback(() => {
        return Promise.resolve({
            meta: {
                matchedresults: 1000,
            },
            data: [
                {
                    uniqField: '1',
                    field1: tab,
                    field2: 'Field 2 content',
                    field3: 'Field 3 content',
                },
                {
                    uniqField: '2',
                    field1: 'Field 1 content 2',
                    field2: 'Field 2 content 2',
                    field3: 'Field 3 content 2',
                },
            ],
        })
    }, [tab])

    return (
        <DndProvider backend={HTML5Backend}>
            <button
                type="button"
                onClick={() => {
                    return richtableRef.current && richtableRef.current.update(
                        {
                            uniqField: '2',
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
            </div>
            <RichTable
                {...args}
                uniqField="uniqField"
                ref={richtableRef}
                columns={[
                    {
                        id: 'field1',
                        filterField: 'field1',
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
                ]}
                load={load}
            />
        </DndProvider>
    )
}

export const Primary = Template.bind({})
Primary.args = {}
