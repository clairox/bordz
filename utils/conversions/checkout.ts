import { CheckoutResponse } from '@/types/api'
import { mapProductResponseToProduct } from '.'

export const mapCheckoutResponseToCheckout = (
    response: CheckoutResponse
): Checkout => {
    const lines = response.lines.map(line => {
        return {
            id: line.id,
            checkoutId: line.checkoutId,
            product: mapProductResponseToProduct(line.product),
            quantity: line.quantity,
            unitPrice: line.unitPrice,
        }
    })

    return {
        id: response.id,
        customerId: response.customerId ?? undefined,
        email: response.email ?? undefined,
        lines: lines,
        subtotal: response.subtotal,
        totalShipping: response.totalShipping,
        totalTax: response.totalTax,
        total: response.total,
        completedAt: response.completedAt ?? undefined,
        shippingAddressId: response.shippingAddressId ?? undefined,
        paymentIntentId: response.paymentIntentId ?? undefined,
        cartId: response.cartId ?? undefined,
        orderId: response.orderId ?? undefined,
    }
}
