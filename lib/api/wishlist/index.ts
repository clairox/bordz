import fetchAbsolute from '@/lib/fetchAbsolute'
import { WishlistLinesResponse, WishlistResponse } from '@/types/api'

export const fetchWishlist = async (
    customerId?: string
): Promise<WishlistResponse> => {
    return await fetchAbsolute<WishlistResponse>('/wishlist', {
        method: 'POST',
        body: JSON.stringify({ customerId }),
    })
}

export const fetchWishlistLines = async ({
    size,
    page,
    orderBy,
}: FetchManyOptions): Promise<WishlistLinesResponse> => {
    const params = []
    if (size != undefined) {
        params.push(`size=${size}`)
    }

    if (page != undefined) {
        params.push(`page=${page}`)
    }

    if (orderBy) {
        params.push(`orderBy=${orderBy}`)
    }

    const paramString = params.length ? '?' + params.join('&') : ''
    const path = '/wishlist/lines' + paramString
    return await fetchAbsolute<WishlistLinesResponse>(path)
}

export const createWishlistLine = async (
    productId: string
): Promise<WishlistResponse> => {
    return await fetchAbsolute<WishlistResponse>(`/wishlist/lines`, {
        method: 'POST',
        body: JSON.stringify({ productId }),
    })
}

export const deleteWishlistLine = async (
    lineId: string
): Promise<WishlistResponse> => {
    return await fetchAbsolute<WishlistResponse>(`/wishlist/lines/${lineId}`, {
        method: 'DELETE',
    })
}
