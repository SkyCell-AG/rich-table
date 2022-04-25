import {
    renderHook,
} from '@testing-library/react-hooks'
import noop from 'lodash/noop'

import HeaderCell from 'componentes/HeaderCell'
import RadioSelectRowCell from 'componentes/RadioSelectRowCell'

import useRadioSelectRow from '../useRadioSelectRow'

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
    test('select row', () => {
        const onSelectRowSpy = jest.fn()
        const {
            result,
        } = renderHook(() => {
            return useRadioSelectRow({
                columns,
                onSelectRow: onSelectRowSpy,
                uniqField: 'uniqField',
                selectedRows: ['1'],
            })
        })

        expect(result.current).toEqual([
            {
                Cell: RadioSelectRowCell,
                Header: HeaderCell,
                className: 'makeStyles-headerCell-1',
                id: 'Select',
                mapCellProps: expect.anything(),
                mapHeaderProps: noop,
                width: '60px',
            },
            {
                filterField: 'someField',
                filterType: 'specialFilter',
                headerProps: {
                    children: 'Heading 1',
                },
                id: '1',
                props: {
                    prop1: 'prop1-1',
                },
            },
            {
                id: '2',
                mapHeaderProps: expect.anything(),
                props: {
                    prop1: 'prop1-2',
                },
            },
        ])

        const radioCellMapper1 = result.current[0].mapCellProps({
            uniqField: '1',
        })

        expect(radioCellMapper1).toEqual(expect.objectContaining({
            checked: true,
            selectedRow: true,
        }))
        radioCellMapper1.onChange('1')
        expect(onSelectRowSpy).not.toHaveBeenCalled()

        const radioCellMapper2 = result.current[0].mapCellProps({
            uniqField: '2',
        })

        expect(radioCellMapper2).toEqual(expect.objectContaining({
            checked: false,
            selectedRow: false,
        }))
        radioCellMapper2.onChange('2')
        expect(onSelectRowSpy).toHaveBeenCalledWith(['2'])
    })

    test('without onSelectRow', () => {
        const {
            result,
        } = renderHook(() => {
            return useRadioSelectRow({
                columns,
                uniqField: 'uniqField',
            })
        })

        expect(result.current).toEqual(columns)
    })
})
