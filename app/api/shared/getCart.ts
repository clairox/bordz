import { eq } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { CartTable } from '@/drizzle/schema/cart'
import { CartQueryResult } from '@/types/queries'
import { boardSetup } from './'

const getCart = async (id: string): Promise<CartQueryResult | undefined> => {
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

export default getCart
