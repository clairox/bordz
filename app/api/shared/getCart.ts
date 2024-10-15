import { db } from '@/drizzle/db'
import { CartTable } from '@/drizzle/schema/cart'
import { eq } from 'drizzle-orm'

const getCart = async (id: string) => {
    return await db.query.CartTable.findFirst({
        where: eq(CartTable.id, id),
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

export default getCart
