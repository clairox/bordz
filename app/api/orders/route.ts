import { NextRequest, NextResponse } from 'next/server'

import {
    handleRoute,
    getRequestOptionsParams,
    validateRequestBody,
} from '../shared'
import { deleteOrders, getOrders } from 'services/order'

export const GET = async (request: NextRequest) =>
    await handleRoute(async () => {
        const { page, size } = getRequestOptionsParams(request)
        const customerId = request.nextUrl.searchParams.get('customer')
        const data = await getOrders({
            customerId: customerId ?? undefined,
            page,
            size,
        })
        return NextResponse.json(data)
    })

export const DELETE = async (request: NextRequest) =>
    await handleRoute(async () => {
        const data = await request.json()
        validateRequestBody(data, ['ids'])
        await deleteOrders(data.ids)
        return new NextResponse(null, { status: 204 })
    })
