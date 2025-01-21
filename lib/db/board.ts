'use server'

import { eq } from 'drizzle-orm'

import { BoardSetupQueryResult } from '@/types/queries'
import { db } from '@/drizzle/db'
import { Boards } from '@/drizzle/schema/board'

const withAttributes = (
    value: boolean = false
): { with: { componentAttributes: true } } | true => {
    if (value) {
        return {
            with: {
                componentAttributes: true,
            },
        }
    } else {
        return true
    }
}

export async function getBoardByProductId(
    productId: string,
    full: boolean = false
): Promise<BoardSetupQueryResult | undefined> {
    return await db.query.Boards.findFirst({
        where: eq(Boards.productId, productId),
        with: {
            deck: withAttributes(full),
            trucks: withAttributes(full),
            wheels: withAttributes(full),
            bearings: withAttributes(full),
            hardware: withAttributes(full),
            griptape: withAttributes(full),
        },
    })
}
