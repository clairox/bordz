import { ProductResponse } from '@/types/api'

export const mapProductResponseToProduct = (
    response: ProductResponse
): Product => {
    return {
        id: response.id,
        title: response.title,
        price: response.price,
        featuredImage: response.featuredImage ?? undefined,
        availableForSale: response.availableForSale,
        productType: response.productType,
        isPublic: response.isPublic,
    }
}
