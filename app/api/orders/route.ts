import { NextRequest, NextResponse } from 'next/server'
import { desc, eq, inArray } from 'drizzle-orm'

import {
    handleRoute,
    calculateNextPageNumber,
    getRequestOptionsParams,
    validateRequestBody,
} from '../shared'
import { db } from '@/drizzle/db'
import { Orders } from '@/drizzle/schema/order'

export const GET = async (request: NextRequest) =>
    await handleRoute(async () => {
        const { page, size } = getRequestOptionsParams(request)
        const customerId = request.nextUrl.searchParams.get('customer')

        const where = customerId ? eq(Orders.customerId, customerId) : undefined

        const orders = await db.query.Orders.findMany({
            where,
            limit: size,
            offset: (page - 1) * size,
            orderBy: [desc(Orders.createdAt)],
            with: {
                lines: {
                    with: {
                        product: true,
                    },
                },
                customer: true,
                shippingAddress: true,
            },
        })

        const nextPage = await calculateNextPageNumber(
            page,
            size,
            Orders,
            where
        )

        return NextResponse.json({ data: orders, nextPage })
    })

export const DELETE = async (request: NextRequest) =>
    await handleRoute(async () => {
        const data = await request.json()
        validateRequestBody(data, ['ids'])

        await db.delete(Orders).where(inArray(Orders.id, data.ids))
        return new NextResponse(null, { status: 204 })
    })
