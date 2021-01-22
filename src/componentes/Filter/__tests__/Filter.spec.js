import React from 'react'
import {
    shallow,
    mount,
} from 'enzyme'

import Filter from '../Filter'

describe('app/shared-components/Filter should match snapshot', () => {
    it('should match snapshot', () => {
        const wrapper = shallow(
            <Filter
                className="makeStyles-item-2"
                id="containerStatus"
                setSearchPhrase={jest.fn()}
                searchPhrase=""
                filter={['9x1EF20BD4D474D284ED257A1DAE235766F6EB3C2255BB0901832616UY']}
                set={jest.fn()}
                load={jest.fn()}
                predefinedFilter={{}}
                filters={[
                    {
                        count: 10,
                        label: '2500C',
                        value: '9x1EF20BD4D474D284ED257A1DAE235766F6EB3C2255BB0901832616UY',
                    },
                    {
                        count: 4,
                        label: '1500C',
                        value: '9x1EF20BD4D474D284ED257A1DAE235766F6EB3C2255BB0901832618B5',
                    },
                ]}
                status="SUCCESS"
            />,
        )

        expect(wrapper).toMatchSnapshot()
    })

    it('renders without crashing', () => {
        mount(
            <Filter
                id="containerStatus"
                setSearchPhrase={jest.fn()}
                searchPhrase=""
                filter={['9x1EF20BD4D474D284ED257A1DAE235766F6EB3C2255BB0901832616UY']}
                set={jest.fn()}
                load={jest.fn()}
                status="SUCCESS"
            />,
        )
    })
})
