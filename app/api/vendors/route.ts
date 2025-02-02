import { NextRequest, NextResponse } from 'next/server'

import { handleRoute, PostVendorSchema } from '../shared'
import { getVendors, createVendor } from 'services/vendor'
import { chkRequest } from '@/lib/validator'

export const GET = async () =>
    await handleRoute(async () => {
        const vendors = await getVendors()
        return NextResponse.json(vendors)
    })

export const POST = async (request: NextRequest) =>
    await handleRoute(async () => {
        const { name } = await chkRequest(PostVendorSchema, request)
        const newVendor = await createVendor(name)
        return NextResponse.json(newVendor)
    })
