const fetchAbsolute = (
    info: RequestInfo | URL,
    init?: RequestInit
): Promise<Response> => {
    if (typeof info === 'string') {
        const isPathname = info.startsWith('/')
        if (!isPathname && !URL.canParse(info)) {
            throw new Error('Invalid URL')
        }

        const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL
        if (!baseUrl) {
            throw new Error('NEXT_PUBLIC_BASE_API_URL is not defined.')
        }

        info = isPathname ? baseUrl + info : info
    }

    return fetch(info, init)
}

export default fetchAbsolute
