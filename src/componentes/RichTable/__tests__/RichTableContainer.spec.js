import React from 'react'
import {
    shallow,
} from 'enzyme'

import useSequence from '../hooks/useSequence'
import useVisible from '../hooks/useVisible'
import useFilter from '../hooks/useFilter'
import useSort from '../hooks/useSort'
import useSelectRow from '../hooks/useSelectRow'
import RichTableContainer from '../RichTableContainer'

jest.mock('uuid', () => {
    return {
        v1: jest.fn(() => { return 'random-key' }),
    }
})
jest.mock('../hooks/useSequence', () => {
    return jest.fn()
})
jest.mock('../hooks/useVisible', () => {
    return jest.fn()
})
jest.mock('../hooks/useFilter', () => {
    return jest.fn()
})
jest.mock('../hooks/useSort', () => {
    return jest.fn()
})
jest.mock('../hooks/useSelectRow', () => {
    return jest.fn()
})

describe('RichTableContainer', () => {
    test('snapshot', () => {
        useSelectRow.mockReturnValue([
            {
                id: '1',
                prop: '1',
            },
            {
                id: '2',
                prop: '2',
            },
            {
                id: '3',
                prop: '3',
            },
            {
                id: '4',
                prop: '4',
            },
        ])
        useSequence.mockReturnValue([
            [
                {
                    id: 'id1',
                },
                {
                    id: 'id2',
                },
                {
                    id: 'id3',
                },
            ],
            jest.fn(),
        ])
        useVisible.mockReturnValue([
            [
                'id1',
                'id2',
                'id3',
                'id4',
            ],
            jest.fn(),
        ])
        useFilter.mockReturnValue([
            {},
            jest.fn(),
            jest.fn(),
        ])
        useSort.mockReturnValue([
            {
                'some-prop': 'asc',
            },
            jest.fn(),
            jest.fn(),
        ])

        const columns = [
            {
                id: 'id1',
                headerProps: {
                    children: 'Heading 1',
                },
                props: {
                    prop1: 'prop1-1',
                },
            },
            {
                id: 'id2',
                mapHeaderProps: () => {
                    return {
                        children: 'Heading 2',
                    }
                },
                props: {
                    prop1: 'prop1-2',
                },
            },
            {
                id: 'id3',
                props: {
                    prop1: 'prop1-3',
                },
            },
        ]

        expect(
            shallow(<RichTableContainer
                load={jest.fn()}
                name="some-name"
                columns={columns}
            />),
        ).toMatchSnapshot()

        expect(
            useSelectRow.mock.calls,
        ).toEqual(
            [[{
                columns: [],
                onSelectRow: undefined,
                selectedRows: undefined,
                uniqField: 'id',
            }]],
        )
        expect(
            useSequence.mock.calls,
        ).toEqual(
            [[[
                {
                    headerProps: {
                        children: 'Heading 1',
                    },
                    id: 'id1',
                    label: 'Heading 1',
                    props: {
                        prop1: 'prop1-1',
                    },
                },
                {
                    id: 'id2',
                    label: 'Heading 2',
                    mapHeaderProps: columns[1].mapHeaderProps,
                    props: {
                        prop1: 'prop1-2',
                    },
                },
                {
                    id: 'id3',
                    label: '',
                    props: {
                        prop1: 'prop1-3',
                    },
                },
            ]]],
        )
        expect(
            useVisible.mock.calls,
        ).toEqual(
            [[
                [
                    {
                        headerProps: {
                            children: 'Heading 1',
                        },
                        id: 'id1',
                        label: 'Heading 1',
                        props: {
                            prop1: 'prop1-1',
                        },
                    },
                    {
                        id: 'id2',
                        label: 'Heading 2',
                        mapHeaderProps: columns[1].mapHeaderProps,
                        props: {
                            prop1: 'prop1-2',
                        },
                    },
                    {
                        id: 'id3',
                        label: '',
                        props: {
                            prop1: 'prop1-3',
                        },
                    },
                ],
                [],
            ]],
        )
        expect(
            useFilter.mock.calls,
        ).toEqual(
            [[{}]],
        )
        expect(
            useSort.mock.calls,
        ).toEqual(
            [[{}]],
        )
    })
})
