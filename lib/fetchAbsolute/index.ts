const fetchAbsolute = async <TResponseData>(
    info: RequestInfo | URL,
    init?: RequestInit
): Promise<TResponseData> => {
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

    const response = await fetch(info, init)
    if (!response.ok) {
        throw response
    }

    if (response.status !== 204) {
        return await response.json()
    } else {
        return null as TResponseData
    }
}

export default fetchAbsolute
