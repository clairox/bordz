import fetchAbsolute from '@/lib/fetchAbsolute'

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
    const response = await fetchAbsolute(`/products/${productId}`, {
        method: 'PATCH',
        body: JSON.stringify(args),
    })
    if (!response.ok) {
        throw response
    }
    return await response.json()
}

export default updateProduct
