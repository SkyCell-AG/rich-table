import React from 'react'
import {
    shallow,
} from 'enzyme'

import InfiniteList from 'componentes/InfiniteList'

import RichTable from '../RichTable'

describe('BeforeList', () => {
    test('BeforeList snapshot', () => {
        const element = shallow(
            <RichTable
                name="someName"
                load={jest.fn()}
                rerenderInfinitList={jest.fn()}
                changeSequence={jest.fn()}
                removeSort={jest.fn()}
                removeFilter={jest.fn()}
                visible={[
                    'column1',
                    'column2',
                ]}
                infinitListKey="infinitListKey"
                setVisible={jest.fn()}
                columns={[
                    {
                        id: 'column1',
                        filterField: 'filter1',
                        setFilter: jest.fn(),
                        props: {
                            column1: 'column1',
                        },
                    },
                    {
                        id: 'column2',
                        filterField: 'filter2',
                        setFilter: jest.fn(),
                        props: {
                            column2: 'column2',
                        },
                    },

                ]}
                setMatchedResults={jest.fn()}
            />,
        )

        const BeforeListComponent = element.find(InfiniteList)
            .props()
            .BeforeList

        expect(
            shallow(
                <BeforeListComponent
                    data={{
                        some: 'data',
                    }}
                />,
            ),
        ).toMatchSnapshot()
    })
})
