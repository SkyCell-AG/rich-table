import React from 'react'
import {
    shallow,
} from 'enzyme'
import delay from 'lodash/delay'

import InfiniteListContainer from '../InfinitListContainer'
import InfiniteList from '../InfiniteList'

describe('InfinitListContainer', () => {
    test('snapshot on load Success', () => {
        const load = jest.fn().mockImplementation((d) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    return resolve({
                        meta: {
                            matchedresults: 20,
                        },
                        data: [{
                            val: d,
                        }],
                    })
                }, 200)
            })
        })

        const infiniteListContainerElement = shallow(
            <InfiniteListContainer
                Row={jest.fn()}
                uniqField="id"
                load={load}
                onUpdateMatchedResults={jest.fn()}
                renderFailureMessage={jest.fn()}
                renderEmptyMessage={jest.fn()}
            />,
        )

        delay(() => {
            infiniteListContainerElement.find(InfiniteList).props().loadNextPage()
            infiniteListContainerElement.find(InfiniteList).props().loadNextPage()
        }, 100)
        delay(() => {
            infiniteListContainerElement.find(InfiniteList).props().loadNextPage()
        }, 110)
        delay(() => {
            infiniteListContainerElement.find(InfiniteList).props().loadNextPage()
        }, 300)

        return new Promise((resolve) => {
            setTimeout(resolve, 400)
        })
            .then(() => {
                infiniteListContainerElement.find(InfiniteList).props().loadNextPage()

                return new Promise((resolve2) => {
                    setTimeout(resolve2, 500)
                })
            })
            .then(() => {
                expect(
                    infiniteListContainerElement,
                ).toMatchSnapshot()
            })
    })
})
