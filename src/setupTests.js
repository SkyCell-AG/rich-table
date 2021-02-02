import 'jest-enzyme'
import {
    configure,
} from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import {
    createSerializer,
} from 'enzyme-to-json'
import {
    toMatchImageSnapshot,
} from 'jest-image-snapshot'

configure({
    adapter: new Adapter(),
})

expect.extend({
    toMatchImageSnapshot,
})

expect.addSnapshotSerializer(createSerializer({
    mode: 'shallow',
}))
