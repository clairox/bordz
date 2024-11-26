import { eq } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { CheckoutTable } from '@/drizzle/schema/checkout'

const getCheckout = async (id: string) => {
    return await db.query.CheckoutTable.findFirst({
        where: eq(CheckoutTable.id, id),
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

export default getCheckout
