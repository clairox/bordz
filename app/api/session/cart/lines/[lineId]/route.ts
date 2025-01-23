import { NextRequest, NextResponse } from 'next/server'

import { getRequiredRequestCookie, handleRoute } from '@/app/api/shared'
import { DynamicRoutePropsWithParams } from '@/types/api'
import { getCartLine, removeCartLine } from 'services/cart'

type Props = DynamicRoutePropsWithParams<{ lineId: string }>

export const GET = async (_: NextRequest, { params: { lineId } }: Props) =>
    await handleRoute(async () => {
        const cartLine = await getCartLine(lineId)
        return NextResponse.json(cartLine)
    })

export const DELETE = async (
    request: NextRequest,
    { params: { lineId } }: Props
) =>
    await handleRoute(async () => {
        const { value: cartId } = getRequiredRequestCookie(request, 'cartId')

        const updatedCart = await removeCartLine(cartId, lineId)
        return NextResponse.json(updatedCart)
    })
