import { ProductResponse } from '@/types/api'
import boardResponseToBoard from './boardResponseToBoard'

const productResponseToProduct = (data: ProductResponse): Product => {
    return {
        id: data.id,
        title: data.title,
        price: data.price,
        featuredImage: data.featuredImage ?? undefined,
        availableForSale: data.availableForSale,
        productType: data.productType,
        board: data.boardSetup
            ? boardResponseToBoard(data.boardSetup)
            : undefined,
        isPublic: data.isPublic,
    }
}

export default productResponseToProduct
