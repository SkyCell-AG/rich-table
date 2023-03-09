import React from 'react'
import {
    shallow,
} from 'enzyme'
import CircularProgress from '@mui/material/CircularProgress'

import {
    PENDING,
    SUCCESS,
} from 'utils/requestStatuses'

import InfiniteList from '../InfiniteList'

describe('InfiniteList', () => {
    let infiniteListElement = null

    beforeEach(() => {
        infiniteListElement = shallow(
            <InfiniteList
                status={SUCCESS}
                BeforeList={() => { return <div>Before</div> }}
                renderFailureMessage={jest.fn()}
                renderEmptyMessage={jest.fn()}
                className="infinite-list"
                onScroll={jest.fn()}
                data={[
                    {
                        field: 1,
                        id: 1,
                        key: 1,
                    },
                    {
                        field: 2,
                        id: 2,
                        key: 2,
                    },
                ]}
                Row={({
                    key,
                    field,
                }) => {
                    return <div key={`row-${key}`}>{field}</div>
                }}
            />,
        )
    })

    test('snapshot', () => {
        expect(
            infiniteListElement,
        ).toMatchSnapshot()
    })

    test('loading', () => {
        expect(
            infiniteListElement
                .setProps({
                    status: PENDING,
                })
                .find(CircularProgress)
                .props(),
        )
            .toEqual({
                className: 'makeStyles-loader-4',
                size: 40,
            })
    })
})
