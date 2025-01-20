import { BoardFullResponse, BoardResponse } from '@/types/api'

export const mapComponentResponseToComponent = (
    response: BoardFullResponse[ComponentType]
): Component => {
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
        category: response.componentAttributes.category,
        vendor: response.componentAttributes.vendor,
        size: response.componentAttributes.size,
        color: response.componentAttributes.color,
    }
}

export const mapComponentResponseToComponentSummary = (
    response: BoardResponse[ComponentType]
): ComponentSummary => {
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
