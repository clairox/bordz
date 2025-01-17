import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { OrderTable } from '@/drizzle/schema/order'
import { handleRoute, boardSetup } from '../../shared'
import { createNotFoundError } from '@/lib/errors'
import { DynamicRoutePropsWithParams } from '@/types/api'

type Props = DynamicRoutePropsWithParams<{ orderId: string }>

export const GET = async (_: NextRequest, { params: { orderId } }: Props) =>
    await handleRoute(async () => {
        const order = await db.query.OrderTable.findFirst({
            where: eq(OrderTable.id, orderId),
            with: {
                customer: true,
                shippingAddress: true,
                lines: {
                    with: {
                        product: {
                            with: {
                                boardSetup,
                            },
                        },
                    },
                },
            },
        })

        return NextResponse.json(order)
    })

export const PATCH = async (
    request: NextRequest,
    { params: { orderId } }: Props
) =>
    await handleRoute(async () => {
        const data = await request.json()

        const order = await db.query.OrderTable.findFirst({
            where: eq(OrderTable.id, orderId),
        })
        if (!order) {
            throw createNotFoundError('Order')
        }

        const updatedOrder = await db
            .update(OrderTable)
            .set({
                customerId: data.customerId,
                email: data.email,
                phone: data.phone,
                shippingAddressId: data.shippingAddressId,
                totalShipping: data.totalShipping,
                totalTax: data.totalTax,
                total:
                    order.total + data.totalShipping || 0 + data.totalTax || 0,
                updatedAt: new Date(),
            })
            .where(eq(OrderTable.id, orderId))

        return NextResponse.json(updatedOrder)
    })
