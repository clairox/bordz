import fetchAbsolute from '@/lib/fetchAbsolute'
import { CheckoutResponse } from '@/types/api'
import checkoutResponseToCheckout from '@/utils/helpers/checkoutResponseToCheckout'

const fetchCheckout = async (): Promise<Checkout> => {
    const data = await fetchAbsolute<CheckoutResponse>(`/checkout`)
    return checkoutResponseToCheckout(data)
}

export default fetchCheckout
