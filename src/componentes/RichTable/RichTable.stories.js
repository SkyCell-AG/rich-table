import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import {
    DndProvider,
} from 'react-dnd'
import {
    HTML5Backend,
} from 'react-dnd-html5-backend'


import RichTable from './index'

export const actions = {
    onClick: action('onClick'),
}

storiesOf('RichTable')
    .add('default', () => (
        <DndProvider backend={HTML5Backend}>
            <RichTable
                name="myRichTable"
                columns={[
                    {
                        id: 'field1',
                        filterField: 'field1',
                        mapHeaderProps: () => {
                            return {
                                children: 'Field 1',
                            }
                        },
                        mapCellProps: 'field1',
                    },
                    {
                        id: 'field2',
                        filterField: 'field2',
                        mapHeaderProps: () => {
                            return {
                                children: 'Field 2',
                            }
                        },
                        mapCellProps: 'field2'
                    },
                    {
                        id: 'field3',
                        filterField: 'field3',
                        mapHeaderProps: () => {
                            return {
                                children: 'Field 3',
                            }
                        },
                        mapCellProps: 'field3',
                    }
                ]}
                load={() => {
                    return Promise.resolve({
                        meta: {
                            matchedresults: 1000,
                        },
                        data: [{
                            id: '1',
                            field1: 'Field 1 content',
                            field2: 'Field 2 content',
                            field3: 'Field 3 content',
                        }, {
                            id: '2',
                            field1: 'Field 1 content 2',
                            field2: 'Field 2 content 2',
                            field3: 'Field 3 content 2',
                        }],
                    })
                }}
            />
        </DndProvider>
    ))
