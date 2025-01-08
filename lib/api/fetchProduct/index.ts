import fetchAbsolute from '@/lib/fetchAbsolute'

const fetchProduct = async (id: string) => {
    const response = await fetchAbsolute(`/products/${id}`, {
        cache: 'no-cache',
    })
    if (!response.ok) {
        throw response
    }
    return await response.json()
}

export default fetchProduct
