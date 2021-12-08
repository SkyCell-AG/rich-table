import React from 'react'
import {
    shallow,
} from 'enzyme'

import InfiniteList from 'componentes/InfiniteList'
import BaseRow from 'componentes/BaseRow'

import RichTable from '../RichTable'

const rowProps = {
    id: 'some-id',
    column1: 'column1',
    column2: 'column2',
}

describe('Richtable Row', () => {
    test('snapshot', () => {
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
                        props: {
                            column1: 'column1',
                        },
                    },
                    {
                        id: 'column2',
                        props: {
                            column2: 'column2',
                        },
                    },

                ]}
                setMatchedResults={jest.fn()}
            />,
        )

        const RowComponent = element.find(InfiniteList)
            .props()
            .Row

        expect(
            shallow(
                <RowComponent {...rowProps} />,
            ),
        ).toMatchSnapshot()
    })

    test('row select and unselect', () => {
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
                detailPanel={() => {
                    return <div>DetailPanel</div>
                }}
                infinitListKey="infinitListKey"
                setVisible={jest.fn()}
                columns={[
                    {
                        id: 'column1',
                        props: {
                            column1: 'column1',
                        },
                    },
                    {
                        id: 'column2',
                        props: {
                            column2: 'column2',
                        },
                    },

                ]}
                setMatchedResults={jest.fn()}
            />,
        )

        const RowComponent = element.find(InfiniteList)
            .props()
            .Row

        const rowElement = shallow(
            <RowComponent
                {...rowProps}
            />,
        ).find(BaseRow)

        expect(
            rowElement.props().openRow,
        ).toBeFalsy()

        rowElement.props().rowClick()

        const RowComponentOpened = element.find(InfiniteList)
            .props()
            .Row

        const rowElementOpened = shallow(
            <RowComponentOpened
                id="some-id"
                column1="column1"
                column2="column2"
            />,
        ).find(BaseRow)

        expect(
            rowElementOpened.props().openRow,
        ).toBeTruthy()

        rowElementOpened.props().closeOpenedRow()

        const RowComponentClosed = element.find(InfiniteList)
            .props(
            )
            .Row

        const rowElementClosed = shallow(
            <RowComponentClosed
                {...rowProps}
            />,
        ).find(BaseRow)

        expect(
            rowElementClosed.props().openRow,
        )
            .toBeFalsy()
    })
})
