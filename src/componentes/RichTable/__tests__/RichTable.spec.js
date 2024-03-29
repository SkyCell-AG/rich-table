import React from 'react'
import {
    shallow,
} from 'enzyme'

import BaseRow from 'componentes/BaseRow'
import InfiniteList from 'componentes/InfiniteList'

import RichTable from '../RichTable'

describe('RichTable', () => {
    test('snapshot', () => {
        expect(
            shallow(
                <RichTable
                    name="someName"
                    load={jest.fn()}
                    rerenderInfinitList={jest.fn()}
                    changeSequence={jest.fn()}
                    removeSort={jest.fn()}
                    removeFilter={jest.fn()}
                    ControlPanel={jest.fn()}
                    visible={[
                        'column1',
                        'column2',
                    ]}
                    infinitListKey="infinitListKey"
                    setVisible={jest.fn()}
                    columns={[
                        {
                            id: 'column1',
                            props: {
                                column1: 'column1',
                            },
                            width: '80%',
                        },
                        {
                            id: 'column2',
                            filterField: 'column2',
                            props: {
                                column2: 'column2',
                            },
                        },

                    ]}
                    setMatchedResults={jest.fn()}
                />,
            ),
        ).toMatchSnapshot()
    })

    test('onRow click', () => {
        const spyOnRowClick = jest.fn()
        const rerenderInfinitListMock = jest.fn()
        const wrapper = shallow(
            <RichTable
                name="someName"
                load={jest.fn()}
                rerenderInfinitList={rerenderInfinitListMock}
                changeSequence={jest.fn()}
                removeSort={jest.fn()}
                removeFilter={jest.fn()}
                ControlPanel={jest.fn()}
                visible={[
                    'column1',
                    'column2',
                ]}
                infinitListKey="infinitListKey"
                setVisible={jest.fn()}
                columns={[
                    {
                        id: 'column1',
                        props: {
                            column1: 'column1',
                        },
                        width: '80%',
                    },
                    {
                        id: 'column2',
                        filterField: 'column2',
                        props: {
                            column2: 'column2',
                        },
                    },

                ]}
                setMatchedResults={jest.fn()}
                onRowClick={spyOnRowClick}
                disabled={false}
            />,
        )

        const baseRowWrapper = shallow(wrapper.find(InfiniteList).props().Row({
            id: 1,
        }))

        baseRowWrapper.find(BaseRow).props().rowClick({})
        expect(spyOnRowClick).toHaveBeenCalledWith({
            id: 1,
        }, rerenderInfinitListMock)
    })

    test('no onRow click on disabled', () => {
        const spyOnRowClick = jest.fn()
        const rerenderInfinitListMock = jest.fn()
        const wrapper = shallow(
            <RichTable
                name="someName"
                load={jest.fn()}
                rerenderInfinitList={rerenderInfinitListMock}
                changeSequence={jest.fn()}
                removeSort={jest.fn()}
                removeFilter={jest.fn()}
                ControlPanel={jest.fn()}
                visible={[
                    'column1',
                    'column2',
                ]}
                infinitListKey="infinitListKey"
                setVisible={jest.fn()}
                columns={[
                    {
                        id: 'column1',
                        props: {
                            column1: 'column1',
                        },
                        width: '80%',
                    },
                    {
                        id: 'column2',
                        filterField: 'column2',
                        props: {
                            column2: 'column2',
                        },
                    },

                ]}
                setMatchedResults={jest.fn()}
                onRowClick={spyOnRowClick}
                disabled
            />,
        )

        const baseRowWrapper = shallow(wrapper.find(InfiniteList).props().Row({
            id: 1,
        }))

        baseRowWrapper.find(BaseRow).props().rowClick({})
        expect(spyOnRowClick).not.toBeCalled()
    })
})
