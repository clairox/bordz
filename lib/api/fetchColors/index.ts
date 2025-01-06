import fetchAbsolute from '@/lib/fetchAbsolute'

const fetchColors = async (): Promise<Color[]> => {
    const response = await fetchAbsolute('/colors', { cache: 'no-cache' })
    if (!response.ok) {
        throw response
    }
    return await response.json()
}

export default fetchColors
