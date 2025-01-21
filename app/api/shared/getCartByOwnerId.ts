import { eq } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { Carts } from '@/drizzle/schema/cart'
import { CartQueryResult } from '@/types/queries'

const getCartByOwnerId = async (
    ownerId: string
): Promise<CartQueryResult | undefined> => {
    return await db.query.Carts.findFirst({
        where: eq(Carts.ownerId, ownerId),
        with: {
            lines: {
                with: {
                    product: true,
                },
            },
            checkout: true,
        },
    })
}

export default getCartByOwnerId
