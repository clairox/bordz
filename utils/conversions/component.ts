import { ComponentResponse } from '@/types/api'

export const mapComponentResponseToComponent = (
    response: ComponentResponse
): Component => {
    return {
        id: response.id,
        title: response.title,
        description: response.description ?? undefined,
        images: response.images ?? undefined,
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
