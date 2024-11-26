import { eq } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { CartTable } from '@/drizzle/schema/cart'

const getCart = async (id: string) => {
    return await db.query.CartTable.findFirst({
        where: eq(CartTable.id, id),
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
            checkout: true,
        },
    })
}

export default getCart
