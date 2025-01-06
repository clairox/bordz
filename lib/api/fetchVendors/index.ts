import fetchAbsolute from '@/lib/fetchAbsolute'

const fetchVendors = async (): Promise<Vendor[]> => {
    const response = await fetchAbsolute('/vendors', { cache: 'no-cache' })
    if (!response.ok) {
        throw response
    }
    return await response.json()
}

export default fetchVendors
