import {
    useContext,
} from 'react'

import RichTableContext from '../RichTable.context'

const useRichTableContext = () => {
    return useContext(RichTableContext)
}

export default useRichTableContext
