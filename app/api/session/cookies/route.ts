import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'

import { handleRoute } from '../../shared'
import { db } from '@/drizzle/db'
import { Checkouts } from '@/drizzle/schema/checkout'
import { expireCookies } from '@/utils/session'

export const DELETE = async (request: NextRequest) =>
    await handleRoute(async () => {
        const checkoutId = request.cookies.get('checkoutId')?.value
        if (checkoutId) {
            await db
                .update(Checkouts)
                .set({ cartId: null })
                .where(eq(Checkouts.id, checkoutId))
        }

        let response = new NextResponse(null, { status: 204 })
        response = expireCookies(
            ['cartId', 'wishlistId', 'checkoutId'],
            response
        )
        return response
    })
