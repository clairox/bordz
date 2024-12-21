import { NextRequest, NextResponse } from 'next/server'
import { desc, eq } from 'drizzle-orm'

import { handleRoute, calculateNextPageNumber } from '../shared'
import { db } from '@/drizzle/db'
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from '@/utils/constants'
import { OrderTable } from '@/drizzle/schema/order'

export const GET = async (request: NextRequest) => {
    return await handleRoute(async () => {
        const searchParams = request.nextUrl.searchParams
        const customerId = searchParams.get('customer')
        const page = Number(searchParams.get('page')) || DEFAULT_PAGE_NUMBER
        const pageSize = Number(searchParams.get('size')) || DEFAULT_PAGE_SIZE

        const where = customerId
            ? eq(OrderTable.customerId, customerId)
            : undefined

        const orders = await db.query.OrderTable.findMany({
            where,
            limit: pageSize,
            offset: (page - 1) * pageSize,
            orderBy: [desc(OrderTable.createdAt)],
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
                customer: true,
                shippingAddress: true,
            },
        })

        const nextPage = await calculateNextPageNumber(
            page,
            pageSize,
            OrderTable,
            where
        )

        return NextResponse.json({ data: orders, nextPage })
    })
}
