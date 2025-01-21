'use server'

import { eq } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { WishlistTable } from '@/drizzle/schema/wishlist'

// TODO: Create WishlistQueryResult for return type
export async function getWishlist(id: string) {
    return await db.query.WishlistTable.findFirst({
        where: eq(WishlistTable.id, id),
        with: {
            lines: {
                with: {
                    product: true,
                },
            },
        },
    })
}
