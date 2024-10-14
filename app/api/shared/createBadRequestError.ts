import APIError from './APIError'

const createBadRequestError = (message?: string) => {
    return new APIError(
        400,
        `Invalid input data${message ? ': ' + message : '.'}`,
        'BAD_REQUEST'
    )
}

export default createBadRequestError
