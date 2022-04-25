import React from 'react'
import {
    shallow,
} from 'enzyme'

import {
    v1 as uuid,
} from 'uuid'

import useSequence from '../hooks/useSequence'
import useVisible from '../hooks/useVisible'
import useFilter from '../hooks/useFilter'
import useSort from '../hooks/useSort'
import useSelectRowLogic from '../hooks/useSelectRowLogic'
import RichTableContainer from '../RichTableContainer'
import RichTable from '../RichTable'

jest.mock('uuid', () => {
    return {
        v1: jest.fn().mockReturnValue('some-random-key'),
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
jest.mock('../hooks/useSelectRowLogic', () => {
    return jest.fn().mockImplementation(({
        columns: cp,
    }) => {
        return cp
    })
})

let richTableContainerElement
const columns = [
    {
        id: '1',
        filterField: 'someField',
        filterType: 'specialFilter',
        headerProps: {
            children: 'Heading 1',
        },
        props: {
            prop1: 'prop1-1',
        },
    },
    {
        id: '2',
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
        id: '3',
        props: {
            prop1: 'prop1-3',
        },
    },
    {
        id: '4',
        props: {
            prop1: 'prop1-4',
        },
    },
]

const load = jest.fn()

describe('RichTableContainer', () => {
    beforeEach(() => {
        jest.clearAllMocks()

        useSelectRowLogic.mockImplementation(({
            columns: cp,
        }) => {
            return cp
        })
        useVisible.mockReturnValue([
            columns.map(({
                id,
            }) => {
                return id
            }).filter((_, index) => {
                return index !== 2
            }),
            jest.fn(),
        ])
        useSequence.mockImplementation((paramColumns) => {
            return [
                paramColumns.map(({
                    id,
                }) => { return id }),
                jest.fn(),
            ]
        })
        useFilter.mockReturnValue([
            {
                1: 'val',
            },
            jest.fn(),
            jest.fn(),
        ])
        useSort.mockReturnValue([
            {
                field: '1',
                direction: 'asc',
            },
            jest.fn(),
            jest.fn(),
        ])

        richTableContainerElement = shallow(<RichTableContainer
            load={load}
            name="some-name"
            columns={columns}
            filter={{
                1: {
                    some: 'val',
                },
            }}
        />)
    })

    test('snapshot', () => {
        expect(
            richTableContainerElement,
        ).toMatchSnapshot()
        expect(
            useSequence.mock.calls,
        ).toEqual(
            [[[
                {
                    filterField: 'someField',
                    filterType: 'specialFilter',
                    headerProps: {
                        children: 'Heading 1',
                    },
                    id: '1',
                    label: 'Heading 1',
                    props: {
                        prop1: 'prop1-1',
                    },
                },
                {
                    id: '2',
                    label: 'Heading 2',
                    mapHeaderProps: columns[1].mapHeaderProps,
                    props: {
                        prop1: 'prop1-2',
                    },
                },
                {
                    id: '3',
                    label: '',
                    props: {
                        prop1: 'prop1-3',
                    },
                },
                {
                    id: '4',
                    label: '',
                    props: {
                        prop1: 'prop1-4',
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
                        filterField: 'someField',
                        filterType: 'specialFilter',
                        headerProps: {
                            children: 'Heading 1',
                        },
                        id: '1',
                        label: 'Heading 1',
                        props: {
                            prop1: 'prop1-1',
                        },
                    },
                    {
                        id: '2',
                        label: 'Heading 2',
                        mapHeaderProps: columns[1].mapHeaderProps,
                        props: {
                            prop1: 'prop1-2',
                        },
                    },
                    {
                        id: '3',
                        label: '',
                        props: {
                            prop1: 'prop1-3',
                        },
                    },
                    {
                        id: '4',
                        label: '',
                        props: {
                            prop1: 'prop1-4',
                        },
                    },
                ],
                [],
            ]],
        )
        expect(
            useFilter.mock.calls,
        ).toEqual(
            [[{
                1: {
                    some: 'val',
                },
            }]],
        )
        expect(
            useSort.mock.calls,
        ).toEqual(
            [[{}]],
        )

        const [[useSelectRowParams]] = useSelectRowLogic.mock.calls

        expect(useSelectRowParams.uniqField).toBe('id')
        expect(useSelectRowParams.onSelectRow).toBe(undefined)
        expect(useSelectRowParams.selectedRows).toEqual(undefined)
        expect(useSelectRowParams.columns.map(({
            id,
        }) => {
            return id
        })).toEqual([
            '1',
            '2',
            '4',
        ])
    })

    test('rerender infinite list', () => {
        let richtableElement = richTableContainerElement.find(RichTable)

        const {
            infinitListKey,
            rerenderInfinitList,
        } = richtableElement.props()

        uuid.mockReturnValue('updated-key')

        rerenderInfinitList()
        richtableElement = richTableContainerElement.find(RichTable)

        const {
            infinitListKey: newInfinitListKey,
        } = richtableElement.props()

        expect(newInfinitListKey).toBe('updated-key')
        expect(infinitListKey).not.toBe(newInfinitListKey)
    })

    test('load with params successfully', () => {
        const {
            load: loadWithParams,
        } = richTableContainerElement.find(RichTable).props()

        load.mockResolvedValue({})

        loadWithParams(3)

        expect(load).toBeCalledWith({
            filter: {
                1: 'val',
            },
            page: 3,
            sort: {
                field: '1',
                direction: 'asc',
            },
            typeMapping: {
                someField: 'specialFilter',
            },
        })
    })

    test('load with params abortive', () => {
        const {
            load: loadWithParams,
        } = richTableContainerElement.find(RichTable).props()

        jest.spyOn(console, 'error')
            .mockImplementation(() => {
                return null
            })

        load.mockRejectedValue({})

        loadWithParams(3)

        expect(load).toBeCalledWith({
            filter: {
                1: 'val',
            },
            page: 3,
            sort: {
                field: '1',
                direction: 'asc',
            },
            typeMapping: {
                someField: 'specialFilter',
            },
        })
    })

    test('setMatchedResults', () => {
        const {
            setMatchedResults,
            matchedResults,
        } = richTableContainerElement.find(RichTable).props()

        expect(matchedResults).toBe(0)

        setMatchedResults(24)

        const {
            matchedResults: updatedMatchedResults,
        } = richTableContainerElement.find(RichTable).props()

        expect(updatedMatchedResults).toBe(24)
    })

    test('sort', () => {
        const [
            _,
            setSortMock,
        ] = useSort()

        const {
            columns: appliedColumns,
        } = richTableContainerElement.find(RichTable).props()

        expect(appliedColumns[1].props.sortDirection).toBe(undefined)

        appliedColumns[1].props.sort('asc')

        expect(setSortMock).toHaveBeenCalledWith('2', 'asc')
    })

    test('filter', () => {
        const [
            _,
            setFilter,
        ] = useFilter()

        const {
            columns: appliedColumns,
        } = richTableContainerElement.find(RichTable).props()

        expect(appliedColumns[1].props.filter).toBe(undefined)

        appliedColumns[1].props.setFilter({
            field: 1,
        })

        expect(setFilter).toHaveBeenCalledWith('2', {
            field: 1,
        })
    })
})
