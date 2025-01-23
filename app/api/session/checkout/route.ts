import { NextRequest, NextResponse } from 'next/server'

import { getRequiredRequestCookie, handleRoute } from '@/app/api/shared'
import { getCheckout } from 'db/checkout'
import { attachCheckout, updateCheckout } from 'services/checkout'
import { appendCookie } from '@/utils/session'

export const GET = async (request: NextRequest) =>
    await handleRoute(async () => {
        const checkoutId = request.cookies.get('checkoutId')?.value
        let checkout = checkoutId ? await getCheckout(checkoutId) : undefined

        if (!checkout) {
            const { value: cartId } = getRequiredRequestCookie(
                request,
                'cartId'
            )
            checkout = await attachCheckout(cartId)
        }

        let response = NextResponse.json(checkout)
        const maxAge = 60 * 60 * 24
        response = appendCookie('checkoutId', checkout.id, response, { maxAge })
        return response
    })

export const PATCH = async (request: NextRequest) =>
    await handleRoute(async () => {
        const { value: checkoutId } = getRequiredRequestCookie(
            request,
            'checkoutId'
        )
        const data = await request.json()
        const updatedCheckout = await updateCheckout(checkoutId, {
            subtotal: data.subtotal,
            email: data.email,
            shippingAddressId: data.shippingAddressId,
            paymentIntentId: data.paymentIntentId,
        })
        return NextResponse.json(updatedCheckout)
    })
