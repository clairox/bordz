'use server'

import { eq } from 'drizzle-orm'

import { BoardSetupQueryResult } from '@/types/queries'
import { db } from '@/drizzle/db'
import { BoardSetupTable } from '@/drizzle/schema/boardSetup'

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
    return await db.query.BoardSetupTable.findFirst({
        where: eq(BoardSetupTable.productId, productId),
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
