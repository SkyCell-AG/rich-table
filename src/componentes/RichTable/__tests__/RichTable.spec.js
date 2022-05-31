import React from 'react'
import {
    shallow,
} from 'enzyme'

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
})
