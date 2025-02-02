import { NextRequest, NextResponse } from 'next/server'

import { getRequiredRequestCookie, handleRoute } from '@/app/api/shared'
import { expireCookies } from '@/utils/session'
import { completeCheckout } from 'services/checkout'
import { deleteCart } from 'services/cart'
import { incrementCustomerOrderCount } from 'services/customer'

export const POST = async (request: NextRequest) =>
    await handleRoute(async () => {
        const { value: cartId } = getRequiredRequestCookie(request, 'cartId')
        const { value: checkoutId } = getRequiredRequestCookie(
            request,
            'checkoutId'
        )

        const checkout = await completeCheckout(checkoutId)
        await deleteCart(cartId)
        await incrementCustomerOrderCount(checkout.customerId!)

        let response = NextResponse.json({ orderId: checkout.orderId! })
        response = expireCookies(['cartId', 'checkoutId'], response)
        return response
    })
