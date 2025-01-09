import fetchAbsolute from '@/lib/fetchAbsolute'

const fetchColors = async (): Promise<Color[]> => {
    return await fetchAbsolute<Color[]>('/colors', { cache: 'no-cache' })
    if (!response.ok) {
        throw response
    }
}

export default fetchColors
