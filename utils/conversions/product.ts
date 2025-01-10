import { ProductResponse } from '@/types/api'
import { mapBoardResponseToBoard } from '.'

export const mapProductResponseToProduct = (
    response: ProductResponse
): Product => {
    console.log(response.isPublic)
    return {
        id: response.id,
        title: response.title,
        price: response.price,
        featuredImage: response.featuredImage ?? undefined,
        availableForSale: response.availableForSale,
        productType: response.productType,
        board: response.boardSetup
            ? mapBoardResponseToBoard(response.boardSetup)
            : undefined,
        isPublic: response.isPublic,
    }
}
