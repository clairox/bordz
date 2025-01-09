import { OrderResponse } from '@/types/api'
import productResponseToProduct from './productResponseToProduct'

const orderResponseToOrder = (data: OrderResponse): Order => {
    const lines = data.lines.map((line): OrderLine => {
        return {
            id: line.id,
            orderId: line.orderId,
            title: line.title,
            product: line.product
                ? productResponseToProduct(line.product)
                : undefined,
            quantity: line.quantity,
            total: line.total,
        }
    })

    return {
        id: data.id,
        customerId: data.customerId ?? undefined,
        lines: lines,
        email: data.email,
        phone: data.phone ?? undefined,
        shippingAddress: {
            ...data.shippingAddress,
            ownerId: data.shippingAddress.ownerId ?? undefined,
            line2: data.shippingAddress.line2 ?? undefined,
            phone: data.shippingAddress.phone ?? undefined,
        },
        subtotal: data.subtotal,
        totalShipping: data.totalShipping,
        totalTax: data.totalTax,
        total: data.total,
        createdAt: data.createdAt,
    }
}

export default orderResponseToOrder
