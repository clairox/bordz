import { CheckoutQueryResult } from '@/types/queries'
import * as db from '../db'
import {
    createConflictError,
    createInternalServerError,
    createNotFoundError,
} from '../errors'
import { UpdateCheckoutValues } from '@/types/services'
import { SHIPPING_COST } from '@/utils/constants'

export async function getCheckoutByCartId(
    cartId: string
): Promise<CheckoutQueryResult | undefined> {
    const cart = await db.getCart(cartId)
    if (!cart) {
        throw createNotFoundError('Cart')
    }

    if (cart.checkout) {
        const checkout = await db.getCheckout(cart.checkout.id)
        if (!checkout) {
            throw createInternalServerError()
        }
        return checkout
    }
    return undefined
}

export async function attachCheckout(
    cartId: string
): Promise<CheckoutQueryResult> {
    const cart = await db.getCart(cartId)
    if (!cart) {
        throw createNotFoundError('Cart')
    }

    if (cart.checkout) {
        throw createConflictError('A checkout for this cart')
    }

    const checkout = await db.createCheckout({
        cartId: cart.id,
        customerId: cart.ownerId,
    })

    await db.createCheckoutLines(
        cart.lines.map(line => ({
            checkoutId: checkout.id,
            productId: line.productId,
            quantity: line.quantity,
        }))
    )

    const updatedCheckout = await db.getCheckout(checkout.id)
    return updatedCheckout!
}

export async function updateCheckout(
    id: string,
    values: UpdateCheckoutValues
): Promise<CheckoutQueryResult> {
    const calculatedValues: {
        total?: number
        totalShipping?: number
        totalTax?: number
    } = {}

    if (values.subtotal) {
        calculatedValues.totalTax = values.subtotal
        calculatedValues.totalShipping = SHIPPING_COST
        calculatedValues.total =
            calculatedValues.totalTax + calculatedValues.totalShipping
    }

    const updatedCheckout = await db.updateCheckout(id, {
        ...values,
        ...calculatedValues,
    })
    if (!updatedCheckout) {
        throw createNotFoundError('Checkout')
    }
    return updatedCheckout
}

export async function completeCheckout(
    id: string
): Promise<CheckoutQueryResult> {
    const completedCheckout = await db.completeCheckout(id)
    if (!completedCheckout) {
        throw createNotFoundError('Checkout')
    }
    return completedCheckout
}
