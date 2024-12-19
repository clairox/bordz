import { eq } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { WishlistTable } from '@/drizzle/schema/wishlist'

const getWishlist = async (id: string) => {
    return await db.query.WishlistTable.findFirst({
        where: eq(WishlistTable.id, id),
        with: {
            lines: {
                with: {
                    product: {
                        with: {
                            boardSetup: {
                                with: {
                                    deck: true,
                                    trucks: true,
                                    wheels: true,
                                    bearings: true,
                                    hardware: true,
                                    griptape: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    })
}

export default getWishlist
