import { NextRequest, NextResponse } from 'next/server'

import { handleRoute, validateRequestBody } from '../shared'
import { getSizes, createSize } from 'services/size'

export const GET = async () =>
    await handleRoute(async () => {
        const sizes = await getSizes()
        return NextResponse.json(sizes)
    })

export const POST = async (request: NextRequest) =>
    await handleRoute(async () => {
        const data = await request.json()
        validateRequestBody(data, ['size'])

        const newSize = await createSize(data.size)
        return NextResponse.json(newSize)
    })
