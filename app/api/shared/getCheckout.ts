import { eq } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { CheckoutTable } from '@/drizzle/schema/checkout'
import { boardSetup } from './'

const getCheckout = async (id: string) => {
    return await db.query.CheckoutTable.findFirst({
        where: eq(CheckoutTable.id, id),
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

export default getCheckout
