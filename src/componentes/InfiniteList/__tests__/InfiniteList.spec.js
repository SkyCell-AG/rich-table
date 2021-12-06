import React from 'react'
import {
    shallow,
} from 'enzyme'
import CircularProgress from '@mui/material/CircularProgress'
import SnackbarContent from '@mui/material/SnackbarContent'

import {
    PENDING,
    FAILURE,
    SUCCESS,
    requestType,
} from 'utils/requestStatuses'

import InfiniteList from '../InfiniteList'

describe('InfiniteList', () => {
    let infiniteListElement = null

    beforeEach(() => {
        infiniteListElement = shallow(
            <InfiniteList
                status={SUCCESS}
                BeforeList={() => { return <div>Before</div> }}
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

    test('no data', () => {
        expect(
            infiniteListElement
                .setProps({
                    data: [],
                })
                .text(),
        )
            .toBe('<BeforeList />No data to show')
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
                className: 'loader',
                size: 40,
            })
    })

    test('failure', () => {
        expect(
            infiniteListElement
                .setProps({
                    status: FAILURE,
                })
                .find(SnackbarContent)
                .props(),
        )
            .toEqual({
                className: 'failureMessage',
                message: 'Failed to load data',
            })
    })
})
