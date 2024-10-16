import APIError from '../APIError'

const createInternalServerError = (message?: string) => {
    return new APIError(
        500,
        `Internal server error${message ? ': ' + message : '.'}`,
        'SERVER_ERROR'
    )
}

export default createInternalServerError
