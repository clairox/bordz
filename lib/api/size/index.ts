import fetchAbsolute from '@/lib/fetchAbsolute'

export const fetchSizes = async (): Promise<Size[]> => {
    return await fetchAbsolute<Size[]>('/sizes', { cache: 'no-cache' })
}
