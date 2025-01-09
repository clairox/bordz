import { ComponentResponse } from '@/types/api'

const componentResponseToComponent = (data: ComponentResponse): Component => {
    return {
        id: data.id,
        title: data.title,
        description: data.description ?? undefined,
        images: data.images ?? undefined,
        model: data.model ?? undefined,
        price: data.price,
        compareAtPrice: data.compareAtPrice ?? undefined,
        specifications: data.specifications ?? undefined,
        availableForSale: data.availableForSale,
        totalInventory: data.totalInventory,
        category: data.componentAttributes.category,
        vendor: data.componentAttributes.vendor,
        size: data.componentAttributes.size,
        color: data.componentAttributes.color,
    }
}

export default componentResponseToComponent
