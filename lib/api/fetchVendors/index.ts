import fetchAbsolute from '@/lib/fetchAbsolute'

const fetchVendors = async (): Promise<Vendor[]> => {
    return await fetchAbsolute<Vendor[]>('/vendors', { cache: 'no-cache' })
}

export default fetchVendors
