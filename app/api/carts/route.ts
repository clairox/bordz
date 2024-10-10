import handleError from '@/lib/errorHandling'
import { db } from '@/db'
import { CartTable } from '@/schema/cart'
import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export const POST = async () => {
    try {
        // Create cart
        const cart = await db
            .insert(CartTable)
            .values({})
            .returning()
            .then(rows => rows[0])

        // Get new cart
        const newCart = await db.query.CartTable.findFirst({
            where: eq(CartTable.id, cart.id),
            with: {
                lines: {
                    with: {
                        product: true,
                    },
                },
            },
        })

        return NextResponse.json(newCart)
    } catch (error) {
        return handleError(error as Error)
    }
}
