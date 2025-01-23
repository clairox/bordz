import { UNEXPECTED_ERROR_TEXT } from '@/utils/constants'
import APIError from '../APIError'

const createInternalServerError = (message: string = UNEXPECTED_ERROR_TEXT) => {
    return new APIError(
        500,
        `Internal server error${message ? ': ' + message : '.'}`,
        'SERVER_ERROR'
    )
}

export default createInternalServerError
