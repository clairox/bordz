import { CartTable } from '@/drizzle/schema/cart'
import { db } from '@/drizzle/db'
import { createInternalServerError } from '@/lib/errors'
import getCart from './getCart'

const createCart = async (ownerId?: string) => {
    const newCart = await db
        .insert(CartTable)
        .values({ ownerId })
        .returning()
        .then(async rows => await getCart(rows[0].id))

    if (!newCart) {
        throw createInternalServerError('Failed to create cart.')
    }

    return newCart
}

export default createCart
