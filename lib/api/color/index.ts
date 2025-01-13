import fetchAbsolute from '@/lib/fetchAbsolute'

export const fetchColors = async (): Promise<Color[]> => {
    return await fetchAbsolute<Color[]>('/colors', { cache: 'no-cache' })
}

export const createColor = async (
    label: string,
    value: string
): Promise<Color> => {
    return await fetchAbsolute<Color>('/colors', {
        method: 'POST',
        body: JSON.stringify({ label, value }),
    })
}
