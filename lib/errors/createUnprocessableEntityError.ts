import APIError from '../APIError'

const createUnprocessableEntityError = (message?: string): APIError => {
    return new APIError(
        422,
        `Unprocessable Entity${message ? ': ' + message : '.'}`,
        'UNPROCESSABLE_ENTITY'
    )
}

export default createUnprocessableEntityError
