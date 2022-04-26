import React from 'react'
import {
    shallow,
} from 'enzyme'
import {
    Radio,
} from '@mui/material'

import RadioSelectRowCell from '../RadioSelectRowCell'

describe('RadioSelectRowCell', () => {
    it('should match snapshot', () => {
        const wrapper = shallow(
            <RadioSelectRowCell
                checked
                onChange={jest.fn()}
            />,
        )

        expect(wrapper).toMatchSnapshot()
    })

    it('not selected', () => {
        const wrapper = shallow(
            <RadioSelectRowCell
                onChange={jest.fn()}
            />,
        )

        expect(wrapper.find(Radio).props().checked).toEqual(false)
    })
})
