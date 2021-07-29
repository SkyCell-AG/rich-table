import React from 'react'
import {
    shallow,
    mount,
} from 'enzyme'
import ChevronRight from '@material-ui/icons/ChevronRight'

import BaseRow from '../BaseRow'

jest.mock(
    '../BaseRow.style',
    () => {
        return () => {
            return {
                hideDetails: 'hideDetails',
                showDetails: 'showDetails',
            }
        }
    },
)

describe('components/BaseRow', () => {
    it('should match snapshot', () => {
        const props = {
            name: 'Note',
            columns: [
                {
                    id: 'noteSubject',
                    headerProps: {
                        children: 'Note Subject',
                    },
                    mapCellProps: 'noteSubject',
                },
                {
                    id: 'noteText',
                    headerProps: {
                        children: 'Note Text',
                    },
                    mapCellProps: 'noteText',
                },
            ],
            uniqFieldValue: '9x3C821DE9260469101EAEF912A3B3961A9E71B1D7037AF64F78DBE960',
            rowClick: jest.fn(),
            rowProps: {
                noteSubject: 'Logger Exchange',
                noteText: 'Internal: ffff477a6c5d',
                changedBy: 'alessio.conese@skycell.ch',
                validDateTimestamp: '28.12.2020 10:35:56 +0100',
                id: '1',
            },
        }

        const wrapper = shallow(<BaseRow {...props} />)

        expect(wrapper).toMatchSnapshot()
    })

    it('with detailPanel', () => {
        const DetailPanel = () => {
            return <div className="detailPanel">detailPanel</div>
        }

        const props = {
            name: 'Note',
            columns: [
                {
                    id: 'noteSubject',
                    headerProps: {
                        children: 'Note Subject',
                    },
                    mapCellProps: 'noteSubject',
                },
                {
                    id: 'noteText',
                    headerProps: {
                        children: 'Note Text',
                    },
                    mapCellProps: 'noteText',
                },
            ],
            uniqFieldValue: '9x3C821DE9260469101EAEF912A3B3961A9E71B1D7037AF64F78DBE960',
            rowClick: jest.fn(),
            rowProps: {
                noteSubject: 'Logger Exchange',
                noteText: 'Internal: ffff477a6c5d',
                changedBy: 'alessio.conese@skycell.ch',
                validDateTimestamp: '28.12.2020 10:35:56 +0100',
            },
            openRow: true,
            detailPanel: DetailPanel,
        }

        const wrapper = shallow(<BaseRow {...props} />)

        expect(wrapper.find(DetailPanel).length).toBe(1)
    })
})
