import React from 'react'
import {
    shallow,
} from 'enzyme'

import FilterItem from '../FilterItem'

describe('app/shared-components/Filter/FilterItem should match snapshot', () => {
    it('should match snapshot', () => {
        const wrapper = shallow(
            <FilterItem
                count={10}
                label="2500C"
                value="9x1EF20BD4D474D284ED257A1DAE235766F6EB3C2255BB0901832616UY"
                checked
                disabled={false}
                onClick={jest.fn()}
            />,
        )

        expect(wrapper).toMatchSnapshot()
    })
})
