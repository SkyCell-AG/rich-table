const createCancelablePromise = (promise) => {
    let cancel = null
    const innerPromise = new Promise((res, reject) => {
        cancel = () => {
            reject(new Error('canceled'))
        }

        return promise
            .then(res)
            .catch(reject)
    })

    return [
        innerPromise,
        cancel,
    ]
}

export default createCancelablePromise
