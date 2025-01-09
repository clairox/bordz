import { eq } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { WishlistTable } from '@/drizzle/schema/wishlist'
import { boardSetup } from './'

const getWishlist = async (id: string) => {
    return await db.query.WishlistTable.findFirst({
        where: eq(WishlistTable.id, id),
        with: {
            lines: {
                with: {
                    product: {
                        with: {
                            boardSetup,
                        },
                    },
                },
            },
        },
    })
}

export default getWishlist
