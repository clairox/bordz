import fetchAbsolute from '@/lib/fetchAbsolute'
import { WishlistLinesResponse } from '@/types/api'
import productResponseToProduct from '@/utils/helpers/productResponseToProduct'

type FetchWishlistLinesOptions = {
    size?: number
    page?: number
    orderBy?: SortKey
}

const fetchWishlistLines = async ({
    size,
    page,
    orderBy,
}: FetchWishlistLinesOptions): Promise<Page<WishlistLine>> => {
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
    const response = await fetchAbsolute(path)
    if (!response.ok) {
        throw response
    }
    const data = (await response.json()) as WishlistLinesResponse
    return {
        data: data.data.map(line => ({
            id: line.id,
            wishlistId: line.wishlistId,
            product: productResponseToProduct(line.product),
        })),
        nextPage: data.nextPage,
    }
}

export default fetchWishlistLines
