import APIError from '../APIError'

const createNotFoundError = (resource: string): APIError => {
    return new APIError(404, `${resource} not found.`, 'NOT_FOUND')
}

export default createNotFoundError
