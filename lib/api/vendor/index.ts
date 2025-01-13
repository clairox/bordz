import fetchAbsolute from '@/lib/fetchAbsolute'

export const fetchVendors = async (): Promise<Vendor[]> => {
    return await fetchAbsolute<Vendor[]>('/vendors', { cache: 'no-cache' })
}

export const createVendor = async (name: string): Promise<Vendor> => {
    return await fetchAbsolute<Vendor>('/vendors', {
        method: 'POST',
        body: JSON.stringify({ name }),
    })
}
