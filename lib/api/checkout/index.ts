import fetchAbsolute from '@/lib/fetchAbsolute'
import { CheckoutResponse, CheckoutUpdateArgs } from '@/types/api'

export const fetchCheckout = async (): Promise<CheckoutResponse> => {
    return await fetchAbsolute<CheckoutResponse>(`/checkout`)
}

export const updateCheckout = async (
    args: CheckoutUpdateArgs
): Promise<CheckoutResponse> => {
    return await fetchAbsolute<CheckoutResponse>(`/checkout`, {
        method: 'PATCH',
        body: JSON.stringify(args),
    })
}

export const completeCheckout = async (): Promise<CheckoutResponse> => {
    return await fetchAbsolute<CheckoutResponse>('/checkout/complete', {
        method: 'POST',
    })
}
