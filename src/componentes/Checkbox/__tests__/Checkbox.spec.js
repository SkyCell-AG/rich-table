import React from 'react'
import {
    shallow,
} from 'enzyme'

import Checkbox from '../Checkbox'

describe('Checkbox', () => {
    it('should match snapshot', () => {
        const wrapper = shallow(
            <Checkbox
                title="title"
                onChange={jest.fn()}
            />,
        )

        expect(wrapper).toMatchSnapshot()
    })
})
