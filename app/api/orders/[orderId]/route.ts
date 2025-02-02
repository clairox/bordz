import { NextRequest, NextResponse } from 'next/server'

import { handleRoute, PatchOrderSchema } from '../../shared'
import { DynamicRoutePropsWithParams } from '@/types/api'
import { getOrder, updateOrder } from '@/lib/services/order'
import { chkRequest } from '@/lib/validator'

type Props = DynamicRoutePropsWithParams<{ orderId: string }>

export const GET = async (_: NextRequest, { params: { orderId } }: Props) =>
    await handleRoute(async () => {
        const order = await getOrder(orderId)
        return NextResponse.json(order)
    })

export const PATCH = async (
    request: NextRequest,
    { params: { orderId } }: Props
) =>
    await handleRoute(async () => {
        const data = await chkRequest(PatchOrderSchema, request)
        const updatedOrder = await updateOrder(orderId, data)
        return NextResponse.json(updatedOrder)
    })
