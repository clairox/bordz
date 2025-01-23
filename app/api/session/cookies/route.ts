import { NextRequest, NextResponse } from 'next/server'

import { handleRoute } from '../../shared'
import { expireCookies } from '@/utils/session'
import { updateCheckout } from 'services/checkout'

export const DELETE = async (request: NextRequest) =>
    await handleRoute(async () => {
        const checkoutId = request.cookies.get('checkoutId')?.value
        if (checkoutId) {
            await updateCheckout(checkoutId, { cartId: null })
        }

        let response = new NextResponse(null, { status: 204 })
        response = expireCookies(
            ['cartId', 'wishlistId', 'checkoutId'],
            response
        )
        return response
    })
