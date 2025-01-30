import APIError from '../APIError'

const createConflictError = (resource?: string) => {
    return new APIError(
        409,
        `${resource ? resource : 'Resource'} already exists.`,
        'CONFLICT'
    )
}

export default createConflictError
