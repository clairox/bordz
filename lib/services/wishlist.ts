import { WishlistLineQueryResult, WishlistQueryResult } from '@/types/queries'
import {
    getWishlist as _getWishlist,
    createWishlist as _createWishlist,
    getWishlistItem as _getWishlistItem,
    getWishlistByOwnerId,
    getWishlistItemsByWishlistId as _getWishlistItemsByWishlistId,
    deleteWishlist as _deleteWishlist,
    createWishlistItem as _createWishlistItem,
    createWishlistItems,
    deleteWishlistItem,
} from '../db'
import {
    createForbiddenError,
    createInternalServerError,
    createNotFoundError,
} from '../errors'
import { AddWishlistItemValues, CreateWishlistValues } from '@/types/services'
import { PaginatedQueryOptions } from '@/types/api'
import {
    DEFAULT_PAGE_NUMBER,
    DEFAULT_PAGE_SIZE,
    DEFAULT_SORT_KEY,
} from '@/utils/constants'
import { calculateNextPage, calculateTotalPages } from '@/utils/math'

export async function createWishlist(
    values?: CreateWishlistValues
): Promise<WishlistQueryResult> {
    return await _createWishlist(values)
}

export async function getWishlist(id: string): Promise<WishlistQueryResult> {
    const wishlist = await _getWishlist(id)
    if (!wishlist) {
        throw createNotFoundError('Wishlist')
    }
    return wishlist
}

export async function getCustomerWishlist(
    customerId: string
): Promise<WishlistQueryResult> {
    const customerWishlist = await getWishlistByOwnerId(customerId)
    if (!customerWishlist) {
        return await _createWishlist({ ownerId: customerId })
    }
    return customerWishlist
}

export async function mergeWishlists(
    source: WishlistQueryResult,
    target: WishlistQueryResult
): Promise<WishlistQueryResult> {
    if (source.items.length === 0 || source.id === target.id) {
        const wishlist = await _getWishlist(target.id)
        if (!wishlist) {
            throw createNotFoundError('Wishlist')
        }
        return wishlist
    }

    const sourceItems = await _getWishlistItemsByWishlistId(source.id).then(
        ({ items }) =>
            items.filter(item => {
                const existingProductIds = target.items.map(
                    item => item.productId
                )
                return !existingProductIds.includes(item.productId)
            })
    )

    await _deleteWishlist(source.id)

    if (sourceItems.length > 0) {
        await createWishlistItems(
            sourceItems.map(item => ({
                wishlistId: target.id,
                productId: item.productId,
            }))
        )
    }

    const mergedWishlist = await _getWishlist(target.id)
    return mergedWishlist!
}

export async function getWishlistItem(
    id: string
): Promise<WishlistLineQueryResult> {
    const wishlistItem = await _getWishlistItem(id)
    if (!wishlistItem) {
        throw createNotFoundError('Wishlist item')
    }
    return wishlistItem
}

export async function addWishlistItem(
    wishlistId: string,
    item: AddWishlistItemValues
): Promise<WishlistQueryResult> {
    const newWishlistItem = await _createWishlistItem({
        wishlistId,
        ...item,
    })
    const updatedWishlist = await _getWishlist(newWishlistItem.wishlistId)
    if (!updatedWishlist) {
        throw createInternalServerError()
    }
    return updatedWishlist
}

export async function removeWishlistItem(
    wishlistId: string,
    itemId: string
): Promise<WishlistQueryResult> {
    const itemToRemove = await _getWishlistItem(itemId)
    if (!itemToRemove) {
        throw createNotFoundError('Cart line')
    }

    if (itemToRemove.wishlistId !== wishlistId) {
        throw createForbiddenError(
            'You do not have permissions to complete this request.'
        )
    }

    await deleteWishlistItem(itemToRemove.id)
    const updatedWishlist = await _getWishlist(wishlistId)
    if (!updatedWishlist) {
        throw createInternalServerError()
    }

    return updatedWishlist
}

export async function getWishlistItemsByWishlistId(
    id: string,
    options?: PaginatedQueryOptions
): Promise<Page<WishlistLineQueryResult>> {
    const page = options?.page ?? DEFAULT_PAGE_NUMBER
    const size = options?.size ?? DEFAULT_PAGE_SIZE
    const orderBy = options?.orderBy ?? DEFAULT_SORT_KEY

    const { items, totalCount } = await _getWishlistItemsByWishlistId(id, {
        limit: size,
        offset: (page - 1) * size,
        orderBy,
    })

    const totalPages = calculateTotalPages(size, totalCount)
    const nextPage = calculateNextPage(page, size, totalCount)
    return { data: items, totalCount, totalPages, nextPage }
}
