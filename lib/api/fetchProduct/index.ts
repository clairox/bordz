import fetchAbsolute from '@/lib/fetchAbsolute'
import { ProductResponse } from '@/types/api'

const fetchProduct = async (id: string) => {
    return await fetchAbsolute<ProductResponse>(`/products/${id}`, {
        cache: 'no-cache',
    })
}

export default fetchProduct
