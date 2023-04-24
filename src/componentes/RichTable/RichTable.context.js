import {
    createContext,
} from 'react'
import noop from 'lodash/noop'

const RichTableContext = createContext({
    setDataTable: noop,
})

export default RichTableContext
