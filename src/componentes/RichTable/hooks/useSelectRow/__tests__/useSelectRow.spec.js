import {
    renderHook,
} from '@testing-library/react-hooks'

import SelectRowCell from 'componentes/SelectRowCell'

import useSelectRow from '../useSelectRow'

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

describe('useSelectRow', () => {
    test('default', () => {
        const onSelectRowSpy = jest.fn()
        const {
            result,
        } = renderHook(() => {
            return useSelectRow({
                columns,
                onSelectRow: onSelectRowSpy,
                uniqField: 'uniqField',
            })
        })

        expect(result.current).toEqual([
            expect.objectContaining({
                Cell: SelectRowCell,
                Header: SelectRowCell,
                id: 'Select',
                width: '60px',
            }),
            columns[0],
            columns[1],
        ])
    })

    test('disabled', () => {
        const onSelectRowSpy = jest.fn()
        const {
            result,
        } = renderHook(() => {
            return useSelectRow({
                columns,
                onSelectRow: onSelectRowSpy,
                uniqField: 'uniqField',
                disabled: true,
            })
        })

        expect(result.current).toEqual([
            expect.objectContaining({
                Cell: SelectRowCell,
                Header: SelectRowCell,
                id: 'Select',
                width: '60px',
            }),
            columns[0],
            columns[1],
        ])

        expect(result.current[0].mapCellProps({})).toEqual({
            checked: false,
            disabled: true,
            onChange: expect.anything(),
            selectedRow: false,
        })
    })
})
