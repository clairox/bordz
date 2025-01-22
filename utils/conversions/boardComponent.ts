import { BoardFullResponse, BoardResponse } from '@/types/api'

export const mapBoardComponentResponseToBoardComponent = (
    response: BoardFullResponse[BoardComponentType]
): BoardComponent => {
    return {
        id: response.id,
        title: response.title,
        description: response.description ?? undefined,
        images: response.images ?? [],
        model: response.model ?? undefined,
        price: response.price,
        compareAtPrice: response.compareAtPrice ?? undefined,
        specifications: response.specifications ?? undefined,
        availableForSale: response.availableForSale,
        totalInventory: response.totalInventory,
        category: response.attrs.category,
        vendor: response.attrs.vendor,
        size: response.attrs.size,
        color: response.attrs.color,
    }
}

export const mapBoardComponentResponseToBoardComponentSummary = (
    response: BoardResponse[BoardComponentType]
): BoardComponentSummary => {
    return {
        id: response.id,
        title: response.title,
        featuredImage: response.images?.[0] ?? undefined,
        price: response.price,
        compareAtPrice: response.compareAtPrice ?? undefined,
        availableForSale: response.availableForSale,
        totalInventory: response.totalInventory,
    }
}
