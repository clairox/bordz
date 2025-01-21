'use server'

import { eq } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { Wishlists } from '@/drizzle/schema/wishlist'

// TODO: Create WishlistQueryResult for return type
export async function getWishlist(id: string) {
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
