import { CartLineQueryResult, CartQueryResult } from '@/types/queries'
import * as db from 'db/cart'
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
        const cart = await db.getCart(target.id)
        if (!cart) {
            throw createNotFoundError('Cart')
        }
        return cart
    }

    const sourceLines = await db.getCartLinesByCartId(source.id).then(lines =>
        lines.filter(line => {
            const existingProductIds = target.lines.map(line => line.productId)
            return !existingProductIds.includes(line.productId)
        })
    )

    await db.deleteCart(source.id)

    if (sourceLines.length > 0) {
        await db.createCartLines(
            sourceLines.map(line => ({
                cartId: target.id,
                productId: line.productId,
                subtotal: line.subtotal,
                quantity: line.quantity,
            }))
        )
    }

    const mergedCart = await db.getCart(target.id)
    return mergedCart!
}

export async function getCustomerCart(
    customerId: string
): Promise<CartQueryResult> {
    const customerCart = await db.getCartByOwnerId(customerId)
    if (!customerCart) {
        return await db.createCart({ ownerId: customerId })
    }

    return removeUnavailableCartItems(customerCart)
}

export async function getCart(id: string): Promise<CartQueryResult> {
    const cart = await db.getCart(id)
    if (!cart) {
        throw createNotFoundError('Cart')
    }

    return removeUnavailableCartItems(cart)
}

export async function createCart(
    values?: CreateCartValues
): Promise<CartQueryResult> {
    return await db.createCart(values)
}

export async function deleteCart(id: string): Promise<string> {
    const deletedCartId = await db.deleteCart(id)
    if (!deletedCartId) {
        throw createNotFoundError('Cart')
    }
    return deletedCartId
}

export async function getCartLine(id: string): Promise<CartLineQueryResult> {
    const cartLine = await db.getCartLine(id)
    if (!cartLine) {
        throw createNotFoundError('Cart line')
    }
    return cartLine
}

export async function addCartLine(
    cartId: string,
    line: AddCartLineValues
): Promise<CartQueryResult> {
    const newCartLine = await db.createCartLine({
        cartId,
        ...line,
    })
    const updatedCart = await db.getCart(newCartLine.cartId)
    if (!updatedCart) {
        throw createInternalServerError()
    }

    return updatedCart
}

export async function removeCartLine(
    cartId: string,
    lineId: string
): Promise<CartQueryResult> {
    const cartLineToRemove = await db.getCartLine(lineId)
    if (!cartLineToRemove) {
        throw createNotFoundError('Cart line')
    }

    if (cartLineToRemove.cartId !== cartId) {
        throw createForbiddenError(
            'You do not have permissions to complete this request.'
        )
    }

    await db.deleteCartLine(cartLineToRemove.id)
    const updatedCart = await db.getCart(cartId)
    if (!updatedCart) {
        throw createInternalServerError()
    }

    return updatedCart
}

export async function removeUnavailableCartItems(
    cart: CartQueryResult
): Promise<CartQueryResult> {
    const unavailableCartItems = cart.lines
        .filter(line => {
            if (!line.product.availableForSale) {
                return line
            }
        })
        .map(line => line.id)

    if (unavailableCartItems.length > 0) {
        await db.deleteCartLines(unavailableCartItems)
        const updatedCart = await db.getCart(cart.id)
        return updatedCart!
    }

    return cart
}

export async function clearCart(id: string): Promise<CartQueryResult> {
    const linesToDelete = await db.getCartLinesByCartId(id)
    await db.deleteCartLines(linesToDelete.map(line => line.id))
    const updatedCart = await db.getCart(id)
    return updatedCart!
}
