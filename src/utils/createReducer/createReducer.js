function createReducer(handlers, initState) {
    return (state = initState, action) => {
        const handler = handlers[action.type]

        if (!handler) {
            return state
        }

        return handler(state, action)
    }
}

export default createReducer
