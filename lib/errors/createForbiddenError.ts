import APIError from '../APIError'

const createForbiddenError = (message?: string): APIError => {
    return new APIError(
        401,
        `Forbidden${message ? ': ' + message : '.'}`,
        'FORBIDDEN'
    )
}

export default createForbiddenError
