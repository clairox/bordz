import fetchAbsolute from '@/lib/fetchAbsolute'
import checkoutResponseToCheckout from '@/utils/helpers/checkoutResponseToCheckout'

const fetchCheckout = async () => {
    const response = await fetchAbsolute(`/checkout`)
    if (!response.ok) {
        throw response
    }
    const data = await response.json()
    return checkoutResponseToCheckout(data)
}

export default fetchCheckout
