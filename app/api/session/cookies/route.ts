import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'

import { handleRoute } from '../../shared'
import { db } from '@/drizzle/db'
import { CheckoutTable } from '@/drizzle/schema/checkout'
import { expireCookies } from '@/utils/session'

export const DELETE = async (request: NextRequest) =>
    await handleRoute(async () => {
        const checkoutId = request.cookies.get('checkoutId')?.value
        if (checkoutId) {
            await db
                .update(CheckoutTable)
                .set({ cartId: null })
                .where(eq(CheckoutTable.id, checkoutId))
        }

        let response = new NextResponse(null, { status: 204 })
        response = expireCookies(
            ['cartId', 'wishlistId', 'checkoutId'],
            response
        )
        return response
    })
