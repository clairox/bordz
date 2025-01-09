import { NextRequest, NextResponse } from 'next/server'
import { desc, eq, inArray } from 'drizzle-orm'

import {
    boardSetup,
    handleRoute,
    calculateNextPageNumber,
    getRequestOptionsParams,
    validateRequestBody,
} from '../shared'
import { db } from '@/drizzle/db'
import { OrderTable } from '@/drizzle/schema/order'

export const GET = async (request: NextRequest) =>
    await handleRoute(async () => {
        const { page, size } = getRequestOptionsParams(request)
        const customerId = request.nextUrl.searchParams.get('customer')

        const where = customerId
            ? eq(OrderTable.customerId, customerId)
            : undefined

        const orders = await db.query.OrderTable.findMany({
            where,
            limit: size,
            offset: (page - 1) * size,
            orderBy: [desc(OrderTable.createdAt)],
            with: {
                lines: {
                    with: {
                        product: {
                            with: {
                                boardSetup,
                            },
                        },
                    },
                },
                customer: true,
                shippingAddress: true,
            },
        })

        const nextPage = await calculateNextPageNumber(
            page,
            size,
            OrderTable,
            where
        )

        return NextResponse.json({ data: orders, nextPage })
    })

export const DELETE = async (request: NextRequest) =>
    await handleRoute(async () => {
        const data = await request.json()
        validateRequestBody(data, ['ids'])

        await db.delete(OrderTable).where(inArray(OrderTable.id, data.ids))
        return new NextResponse(null, { status: 204 })
    })
