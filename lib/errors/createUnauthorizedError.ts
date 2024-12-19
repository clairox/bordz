import APIError from '../APIError'

const createUnauthorizedError = (message?: string): APIError => {
    return new APIError(
        401,
        `Unauthorized${message ? ': ' + message : '.'}`,
        'UNAUTHORIZED'
    )
}

export default createUnauthorizedError
