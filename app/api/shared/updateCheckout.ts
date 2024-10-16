import { eq } from 'drizzle-orm'

import { CheckoutTable } from '@/drizzle/schema/checkout'
import { db } from '@/drizzle/db'
import { CartRecord } from '@/types/records'
import { calculateTaxManually } from '@/utils/helpers'
import { createInternalServerError } from '@/lib/errors'
import getCheckout from './getCheckout'

const updateCheckout = async (id: string, updatedCart: CartRecord) => {
    const totalTax = calculateTaxManually(updatedCart.total)
    const totalShipping = 1000
    const total = totalTax + totalShipping + updatedCart.subtotal

    const updatedCheckout = await db
        .update(CheckoutTable)
        .set({
            subtotal: updatedCart.subtotal,
            total,
            totalTax,
            updatedAt: new Date(),
        })
        .where(eq(CheckoutTable.id, id))
        .returning()
        .then(async rows => await getCheckout(rows[0].id))

    if (!updatedCheckout) {
        throw createInternalServerError('Failed to update checkout.')
    }

    return updatedCheckout
}

export default updateCheckout
