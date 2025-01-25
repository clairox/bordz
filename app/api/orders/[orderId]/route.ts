import { NextRequest, NextResponse } from 'next/server'

import { handleRoute } from '../../shared'
import { DynamicRoutePropsWithParams } from '@/types/api'
import { getOrder, updateOrder } from '@/lib/services/order'

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
        const data = await request.json()
        const updatedOrder = await updateOrder(orderId, {
            customerId: data.customerId,
            email: data.email,
            phone: data.phone,
            shippingAddressId: data.shippingAddressId,
            totalShipping: data.totalShipping,
            totalTax: data.totalTax,
        })
        return NextResponse.json(updatedOrder)
    })
