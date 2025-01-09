import fetchAbsolute from '@/lib/fetchAbsolute'

const fetchSizes = async (): Promise<Size[]> => {
    return await fetchAbsolute<Size[]>('/sizes', { cache: 'no-cache' })
}

export default fetchSizes
