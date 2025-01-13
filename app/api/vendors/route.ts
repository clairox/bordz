import { NextRequest, NextResponse } from 'next/server'

import { db } from '@/drizzle/db'
import { handleRoute, validateRequestBody } from '../shared'
import { VendorTable } from '@/drizzle/schema/component'

export const GET = async () =>
    await handleRoute(async () => {
        const vendors = await db.query.VendorTable.findMany()
        return NextResponse.json(vendors)
    })

export const POST = async (request: NextRequest) =>
    await handleRoute(async () => {
        const data = await request.json()
        validateRequestBody(data, ['name'])

        const newVendor = await db
            .insert(VendorTable)
            .values({ name: data.name })
            .returning()
            .then(rows => rows[0])
        return NextResponse.json(newVendor)
    })
