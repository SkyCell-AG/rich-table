function getDataFromInput(cb) {
    return ({
        target: {
            value,
        },
    }) => {
        return cb(value)
    }
}

export default getDataFromInput
