import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { OrderTable } from '@/drizzle/schema/order'
import { handleRoute } from '../../shared'

type Props = DynamicRoutePropsWithParams<{ orderId: string }>

export const GET = async (_: NextRequest, { params: { orderId } }: Props) =>
    await handleRoute(async () => {
        const order = await db.query.OrderTable.findFirst({
            where: eq(OrderTable.id, orderId),
            with: {
                lines: {
                    with: {
                        product: {
                            with: {
                                boardSetup: {
                                    with: {
                                        deck: true,
                                        trucks: true,
                                        wheels: true,
                                        bearings: true,
                                        hardware: true,
                                        griptape: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        })

        return NextResponse.json(order)
    })
