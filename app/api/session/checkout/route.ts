import { NextRequest, NextResponse } from 'next/server'

import {
    getRequiredRequestCookie,
    handleRoute,
    PatchCheckoutSchema,
} from '@/app/api/shared'
import { getCheckout } from 'db/checkout'
import { attachCheckout, updateCheckout } from 'services/checkout'
import { appendCookie } from '@/utils/session'
import { chkRequest } from '@/lib/validator'

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
        const data = await chkRequest(PatchCheckoutSchema, request)
        const updatedCheckout = await updateCheckout(checkoutId, data)
        return NextResponse.json(updatedCheckout)
    })
