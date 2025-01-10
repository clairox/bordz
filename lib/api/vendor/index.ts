import fetchAbsolute from '@/lib/fetchAbsolute'

export const fetchVendors = async (): Promise<Vendor[]> => {
    return await fetchAbsolute<Vendor[]>('/vendors', { cache: 'no-cache' })
}
