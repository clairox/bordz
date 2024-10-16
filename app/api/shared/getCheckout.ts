import { eq } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { CheckoutTable } from '@/drizzle/schema/checkout'

const getCheckout = async (id: string) => {
    return await db.query.CheckoutTable.findFirst({
        where: eq(CheckoutTable.id, id),
        with: {
            lines: {
                with: {
                    product: true,
                },
            },
        },
    })
}

export default getCheckout
