const fetchAbsolute = (
    info: RequestInfo | URL,
    init?: RequestInit
): Promise<Response> => {
    if (typeof info === 'string') {
        if (!info.startsWith('/')) {
            throw new Error('Invalid fetch url')
        }

        const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL
        if (baseUrl == undefined) {
            throw new Error('NEXT_PUBLIC_BASE_API_URL is not defined')
        }

        info = baseUrl + info
    }

    return fetch(info, init)
}

export default fetchAbsolute
