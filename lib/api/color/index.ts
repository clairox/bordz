import fetchAbsolute from '@/lib/fetchAbsolute'

export const fetchColors = async (): Promise<Color[]> => {
    return await fetchAbsolute<Color[]>('/colors', { cache: 'no-cache' })
}
