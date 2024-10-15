import { db } from '@/drizzle/db'
import { CheckoutTable } from '@/drizzle/schema/checkout'
import { eq } from 'drizzle-orm'

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
