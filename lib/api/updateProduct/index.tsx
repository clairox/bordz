import fetchAbsolute from '@/lib/fetchAbsolute'
import { ProductResponse } from '@/types/api'
import productResponseToProduct from '@/utils/helpers/productResponseToProduct'

type UpdateProductArgs = {
    title?: string
    price?: number
    featuredImage?: string
    isPublic?: boolean
}

// TODO: PUT (?)
const updateProduct = async (
    productId: string,
    args?: UpdateProductArgs
): Promise<Product> => {
    const data = await fetchAbsolute<ProductResponse>(
        `/products/${productId}`,
        {
            method: 'PATCH',
            body: JSON.stringify(args),
        }
    )
    return productResponseToProduct(data)
}

export default updateProduct
