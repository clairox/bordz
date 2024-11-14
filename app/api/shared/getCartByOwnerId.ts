import { eq } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { CartTable } from '@/drizzle/schema/cart'

const getCartByOwnerId = async (ownerId: string) => {
    return await db.query.CartTable.findFirst({
        where: eq(CartTable.ownerId, ownerId),
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