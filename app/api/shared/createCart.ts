import { Carts } from '@/drizzle/schema/cart'
import { db } from '@/drizzle/db'
import { createInternalServerError } from '@/lib/errors'
import getCart from './getCart'
import { CartQueryResult } from '@/types/queries'

const createCart = async (ownerId?: string): Promise<CartQueryResult> => {
    const newCart = await db
        .insert(Carts)
        .values({ ownerId })
        .returning()
        .then(async rows => await getCart(rows[0].id))

    if (!newCart) {
        throw createInternalServerError('Failed to create cart.')
    }

    return newCart
}

export default createCart
