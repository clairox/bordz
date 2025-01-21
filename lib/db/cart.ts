'use server'

import { eq } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { Carts } from '@/drizzle/schema/cart'
import { CartQueryResult } from '@/types/queries'

export async function getCart(
    id: string
): Promise<CartQueryResult | undefined> {
    return await db.query.Carts.findFirst({
        where: eq(Carts.id, id),
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

// export async function createCart(input: CreateCartRecordArgs): Promise<CartQueryResult> {
//     return await db.insert()
// }
