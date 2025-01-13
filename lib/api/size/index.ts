import fetchAbsolute from '@/lib/fetchAbsolute'

export const fetchSizes = async (): Promise<Size[]> => {
    return await fetchAbsolute<Size[]>('/sizes', { cache: 'no-cache' })
}

export const createSize = async (value: string): Promise<Size> => {
    return await fetchAbsolute<Size>('/sizes', {
        method: 'POST',
        body: JSON.stringify({ size: value }),
    })
}
