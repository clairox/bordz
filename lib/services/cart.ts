import { CartLineQueryResult, CartQueryResult } from '@/types/queries'
import {
    createCart as _createCart,
    createCartLine as _createCartLine,
    createCartLines,
    deleteCart as _deleteCart,
    deleteCartLine,
    deleteCartLines,
    getCart as _getCart,
    getCartByOwnerId,
    getCartLine as _getCartLine,
    getCartLinesByCartId,
} from 'db/cart'
import {
    createForbiddenError,
    createInternalServerError,
    createNotFoundError,
} from '../errors'
import { AddCartLineValues, CreateCartValues } from '@/types/services'

export async function mergeCarts(
    source: CartQueryResult,
    target: CartQueryResult
): Promise<CartQueryResult> {
    if (source.lines.length === 0 || source.id === target.id) {
        const cart = await _getCart(target.id)
        if (!cart) {
            throw createNotFoundError('Cart')
        }
        return cart
    }

    const sourceLines = await getCartLinesByCartId(source.id).then(lines =>
        lines.filter(line => {
            const existingProductIds = target.lines.map(line => line.productId)
            return !existingProductIds.includes(line.productId)
        })
    )

    await _deleteCart(source.id)

    if (sourceLines.length > 0) {
        await createCartLines(
            sourceLines.map(line => ({
                cartId: target.id,
                productId: line.productId,
                subtotal: line.subtotal,
                quantity: line.quantity,
            }))
        )
    }

    const mergedCart = await _getCart(target.id)
    return mergedCart!
}

export async function getCustomerCart(
    customerId: string
): Promise<CartQueryResult> {
    const customerCart = await getCartByOwnerId(customerId)
    if (!customerCart) {
        return await _createCart({ ownerId: customerId })
    }
    return customerCart
}

export async function getCart(id: string): Promise<CartQueryResult> {
    const cart = await _getCart(id)
    if (!cart) {
        throw createNotFoundError('Cart')
    }
    return cart
}

export async function createCart(
    values?: CreateCartValues
): Promise<CartQueryResult> {
    return await _createCart(values)
}

export async function deleteCart(id: string): Promise<string> {
    const deletedCartId = await _deleteCart(id)
    if (!deletedCartId) {
        throw createNotFoundError('Cart')
    }
    return deletedCartId
}

export async function getCartLine(id: string): Promise<CartLineQueryResult> {
    const cartLine = await _getCartLine(id)
    if (!cartLine) {
        throw createNotFoundError('Cart line')
    }
    return cartLine
}

export async function addCartLine(
    cartId: string,
    line: AddCartLineValues
): Promise<CartQueryResult> {
    const newCartLine = await _createCartLine({
        cartId,
        ...line,
    })
    const updatedCart = await _getCart(newCartLine.cartId)
    if (!updatedCart) {
        throw createInternalServerError()
    }

    return updatedCart
}

export async function removeCartLine(
    cartId: string,
    lineId: string
): Promise<CartQueryResult> {
    const cartLineToRemove = await _getCartLine(lineId)
    if (!cartLineToRemove) {
        throw createNotFoundError('Cart line')
    }

    if (cartLineToRemove.cartId !== cartId) {
        throw createForbiddenError(
            'You do not have permissions to complete this request.'
        )
    }

    await deleteCartLine(cartLineToRemove.id)
    const updatedCart = await _getCart(cartId)
    if (!updatedCart) {
        throw createInternalServerError()
    }

    return updatedCart
}

export async function clearCart(id: string): Promise<CartQueryResult> {
    const linesToDelete = await getCartLinesByCartId(id)
    await deleteCartLines(linesToDelete.map(line => line.id))
    const updatedCart = await _getCart(id)
    return updatedCart!
}
