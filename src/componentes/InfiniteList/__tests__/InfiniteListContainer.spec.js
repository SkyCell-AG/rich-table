import React from 'react'
import {
    shallow,
} from 'enzyme'
import InfiniteListContainer from '../InfinitListContainer'

describe('InfinitListContainer', () => {
    let infiniteListContainerElement

    const load = jest.fn()

    const onUpdateMatchedResults = jest.fn()

    beforeEach(() => {
        jest.clearAllMocks()

        infiniteListContainerElement = shallow(
            <InfiniteListContainer
                Row={jest.fn()}
                uniqField="id"
                load={load}
                onUpdateMatchedResults={onUpdateMatchedResults}
            />,
        )
    })

    test('snapshot', () => {
        expect(
            infiniteListContainerElement,
        ).toMatchSnapshot()
    })

    test('loadNextPage', () => {
        const {
            loadNextPage,
        } = infiniteListContainerElement.props()

        loadNextPage()
    })
})
