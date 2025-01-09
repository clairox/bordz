import fetchAbsolute from '@/lib/fetchAbsolute'
import { CheckoutResponse } from '@/types/api'
import checkoutResponseToCheckout from '@/utils/helpers/checkoutResponseToCheckout'

type UpdateCheckout = {
    email?: string
    shippingAddressId?: string
    subtotal?: number
    total?: number
    totalTax?: number
    totalShipping?: number
    paymentIntentId?: string
}

const updateCheckout = async (args: UpdateCheckout): Promise<Checkout> => {
    const data = await fetchAbsolute<CheckoutResponse>(`/checkout`, {
        method: 'PATCH',
        body: JSON.stringify(args),
    })
    return checkoutResponseToCheckout(data)
}

export default updateCheckout
