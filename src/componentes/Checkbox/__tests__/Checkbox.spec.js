import React from 'react'
import {
    shallow,
} from 'enzyme'
import {
    Checkbox as MaterialCheckbox,
} from '@mui/material'

import Checkbox from '../Checkbox'

describe('Checkbox', () => {
    it('should match snapshot', () => {
        const wrapper = shallow(
            <Checkbox
                title="title"
                onChange={jest.fn()}
            />
        )

        expect(wrapper).toMatchSnapshot()
    })

    it('should match snapshot', () => {
        const onChange = jest.fn()

        const wrapper = shallow(
            <Checkbox
                title="title"
                onChange={onChange}
            />
        )

        wrapper.find(MaterialCheckbox).props().onChange()

        expect(onChange).toBeCalled()
    })
})