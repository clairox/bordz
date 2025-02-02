import { OrderResponse } from '@/types/api'
import { mapProductResponseToProduct } from '.'

export const mapOrderResponseToOrder = (response: OrderResponse): Order => {
    const lines = response.lines.map((line): OrderLine => {
        return {
            id: line.id,
            orderId: line.orderId,
            title: line.title,
            product: line.product
                ? mapProductResponseToProduct(line.product)
                : undefined,
            quantity: line.quantity,
            total: line.total,
        }
    })

    return {
        id: response.id,
        customerId: response.customerId ?? undefined,
        lines: lines,
        email: response.email,
        phone: response.phone ?? undefined,
        shippingAddress: response.shippingAddress
            ? {
                  ...response.shippingAddress,
                  ownerId: response.shippingAddress.ownerId ?? undefined,
                  line2: response.shippingAddress.line2 ?? undefined,
                  phone: response.shippingAddress.phone ?? undefined,
              }
            : undefined,
        formattedShippingAddress: response.formattedShippingAddress,
        subtotal: response.subtotal,
        totalShipping: response.totalShipping,
        totalTax: response.totalTax,
        total: response.total,
        createdAt: new Date(response.createdAt),
    }
}

export const mapOrderResponseToOrderAdminList = (
    response: OrderResponse
): OrderAdminList => {
    return {
        id: response.id,
        customerEmail: response.customer?.email,
        customerName: response.customer?.displayName,
        total: response.total,
        shippingAddress: response.shippingAddress.formatted,
        createdAt: response.createdAt,
    }
}
