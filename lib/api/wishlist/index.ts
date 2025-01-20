import fetchAbsolute from '@/lib/fetchAbsolute'
import {
    PaginatedQueryOptions,
    WishlistLinesResponse,
    WishlistResponse,
} from '@/types/api'

export const fetchSessionWishlist = async (
    customerId?: string
): Promise<WishlistResponse> => {
    return await fetchAbsolute<WishlistResponse>('/wishlist', {
        method: 'POST',
        body: JSON.stringify({ customerId }),
    })
}

export const fetchWishlist = async (id: string): Promise<WishlistResponse> => {
    return await fetchAbsolute<WishlistResponse>(`/wishlists/${id}`)
}

export const fetchWishlistLines = async ({
    size,
    page,
    orderBy,
}: PaginatedQueryOptions): Promise<WishlistLinesResponse> => {
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
