import fetchAbsolute from '@/lib/fetchAbsolute'

const fetchSizes = async (): Promise<Size[]> => {
    const response = await fetchAbsolute('/sizes', { cache: 'no-cache' })
    if (!response.ok) {
        throw response
    }
    return await response.json()
}

export default fetchSizes
