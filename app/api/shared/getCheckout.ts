import { eq } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { Checkouts } from '@/drizzle/schema/checkout'
import { boardSetup } from './'

const getCheckout = async (id: string) => {
    return await db.query.Checkouts.findFirst({
        where: eq(Checkouts.id, id),
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
