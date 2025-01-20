import { eq } from 'drizzle-orm'

import { db } from '..'
import { boardSetup } from '@/app/api/shared'
import { CartTable } from '@/drizzle/schema/cart'
import { CartQueryResult } from '@/types/queries'

export const getCart = async (
    id: string
): Promise<CartQueryResult | undefined> => {
    'use server'
    return await db.query.CartTable.findFirst({
        where: eq(CartTable.id, id),
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
            checkout: true,
        },
    })
}
