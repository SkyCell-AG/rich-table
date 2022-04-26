import {
    renderHook,
} from '@testing-library/react-hooks'

import useSelectRow from 'componentes/RichTable/hooks/useSelectRow'
import useRadioSelectRow from 'componentes/RichTable/hooks/useRadioSelectRow'

import useSelectRowLogic from '../useSelectRowLogic'

jest.mock('componentes/RichTable/hooks/useSelectRow', () => {
    return jest.fn()
})
jest.mock('componentes/RichTable/hooks/useRadioSelectRow', () => {
    return jest.fn()
})

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
]

describe('useRadioSelectRow', () => {
    beforeEach(() => {
        useRadioSelectRow.mockImplementation(({
            columns: cp,
        }) => {
            return [
                {
                    cell: 'Radio',
                },
                ...cp,
            ]
        })
        useSelectRow.mockImplementation(({
            columns: cp,
        }) => {
            return [
                {
                    cell: 'Default',
                },
                ...cp,
            ]
        })
    })
    test('with radioSelect = true', () => {
        const onSelectRowSpy = jest.fn()
        const {
            result,
        } = renderHook(() => {
            return useSelectRowLogic({
                columns,
                onSelectRow: onSelectRowSpy,
                uniqField: 'uniqField',
                radioSelect: true,
            })
        })

        expect(result.current).toEqual([
            {
                cell: 'Radio',
            },
            columns[0],
            columns[1],
        ])
    })

    test('with default select cell', () => {
        const onSelectRowSpy = jest.fn()
        const {
            result,
        } = renderHook(() => {
            return useSelectRowLogic({
                columns,
                onSelectRow: onSelectRowSpy,
                uniqField: 'uniqField',
            })
        })

        expect(result.current).toEqual([
            {
                cell: 'Default',
            },
            columns[0],
            columns[1],
        ])
    })

    test('without onSelectRow', () => {
        const {
            result,
        } = renderHook(() => {
            return useSelectRowLogic({
                columns,
                uniqField: 'uniqField',
            })
        })

        expect(result.current).toEqual(columns)
    })
})
