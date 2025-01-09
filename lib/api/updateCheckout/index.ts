import fetchAbsolute from '@/lib/fetchAbsolute'
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
    const response = await fetchAbsolute(`/checkout`, {
        method: 'PATCH',
        body: JSON.stringify(args),
    })

    if (!response.ok) {
        throw response
    }

    const data = await response.json()
    return checkoutResponseToCheckout(data)
}

export default updateCheckout
