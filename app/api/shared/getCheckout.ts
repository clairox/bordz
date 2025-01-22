import { eq } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { Checkouts } from '@/drizzle/schema/checkout'
import { board } from './'

const getCheckout = async (id: string) => {
    return await db.query.Checkouts.findFirst({
        where: eq(Checkouts.id, id),
        with: {
            lines: {
                with: {
                    product: {
                        with: {
                            board,
                        },
                    },
                },
            },
        },
    })
}

export default getCheckout
