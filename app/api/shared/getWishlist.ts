import { eq } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { Wishlists } from '@/drizzle/schema/wishlist'

const getWishlist = async (id: string) => {
    return await db.query.Wishlists.findFirst({
        where: eq(Wishlists.id, id),
        with: {
            lines: {
                with: {
                    product: true,
                },
            },
        },
    })
}

export default getWishlist
