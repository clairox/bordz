import fetchAbsolute from '@/lib/fetchAbsolute'
import { CheckoutResponse, CheckoutUpdateArgs } from '@/types/api'

export const fetchCheckout = async (): Promise<CheckoutResponse> => {
    return await fetchAbsolute<CheckoutResponse>(`/session/checkout`)
}

export const updateCheckout = async (
    args: CheckoutUpdateArgs
): Promise<CheckoutResponse> => {
    return await fetchAbsolute<CheckoutResponse>(`/session/checkout`, {
        method: 'PATCH',
        body: JSON.stringify(args),
    })
}

export const completeCheckout = async (): Promise<CheckoutResponse> => {
    return await fetchAbsolute<CheckoutResponse>('/session/checkout/complete', {
        method: 'POST',
    })
}
