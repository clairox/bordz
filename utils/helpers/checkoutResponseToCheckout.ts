import { CheckoutResponse } from '@/types/api'
import productResponseToProduct from './productResponseToProduct'

const checkoutResponseToCheckout = (data: CheckoutResponse): Checkout => {
    const lines = data.lines.map(line => {
        return {
            id: line.id,
            checkoutId: line.checkoutId,
            product: productResponseToProduct(line.product),
            quantity: line.quantity,
            unitPrice: line.unitPrice,
        }
    })

    return {
        id: data.id,
        customerId: data.customerId ?? undefined,
        email: data.email ?? undefined,
        lines: lines,
        subtotal: data.subtotal,
        totalShipping: data.totalShipping,
        totalTax: data.totalTax,
        total: data.total,
        completedAt: data.completedAt ?? undefined,
        shippingAddressId: data.shippingAddressId ?? undefined,
        paymentIntentId: data.paymentIntentId ?? undefined,
        cartId: data.cartId ?? undefined,
        orderId: data.orderId ?? undefined,
    }
}

export default checkoutResponseToCheckout
