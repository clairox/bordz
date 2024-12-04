import { MAX_HANDLE_LENGTH } from '../constants'

const createUrlHandle = (value: string, maxLength = MAX_HANDLE_LENGTH) => {
    let sanitized = value.replace(/[^a-zA-Z0-9\s-]/g, '')
    sanitized = sanitized.trim().replace(/\s+/g, '-')
    sanitized = sanitized.substring(0, maxLength)
    return encodeURIComponent(sanitized)
}

export default createUrlHandle
