import { NextRequest, NextResponse } from 'next/server'

import { handleRoute, validateRequestBody } from '../shared'
import { getVendors, createVendor } from 'services/vendor'

export const GET = async () =>
    await handleRoute(async () => {
        const vendors = await getVendors()
        return NextResponse.json(vendors)
    })

export const POST = async (request: NextRequest) =>
    await handleRoute(async () => {
        const data = await request.json()
        validateRequestBody(data, ['name'])

        const newVendor = await createVendor(data.name)
        return NextResponse.json(newVendor)
    })
