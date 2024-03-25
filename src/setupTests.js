import 'jest-enzyme'
import {
    configure,
} from 'enzyme'
import Adapter from '@cfaester/enzyme-adapter-react-18'
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
