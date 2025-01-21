import { CartLineResponse, CartResponse } from '@/types/api'
import fetchAbsolute from '../../fetchAbsolute'

export const fetchSessionCart = async (
    customerId?: string
): Promise<CartResponse> => {
    return await fetchAbsolute<CartResponse>('/session/cart', {
        method: 'POST',
        body: JSON.stringify({ customerId }),
    })
}

export const fetchCart = async (id: string): Promise<CartResponse> => {
    return await fetchAbsolute<CartResponse>(`/carts/${id}`)
}

export const fetchCartLine = async (
    lineId: string
): Promise<CartLineResponse> => {
    return await fetchAbsolute<CartLineResponse>(
        `/session/cart/lines/${lineId}`
    )
}

export const createCartLine = async (
    productId: string
): Promise<CartResponse> => {
    return await fetchAbsolute<CartResponse>(`/session/cart/lines`, {
        method: 'POST',
        body: JSON.stringify({ productId, quantity: 1 }),
    })
}

export const deleteCartLine = async (lineId: string): Promise<CartResponse> => {
    return fetchAbsolute<CartResponse>(`/session/cart/lines/${lineId}`, {
        method: 'DELETE',
    })
}

export const clearCart = async (): Promise<CartResponse> => {
    return await fetchAbsolute<CartResponse>(`/session/cart/lines`, {
        method: 'DELETE',
    })
}
