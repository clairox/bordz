import { NextResponse } from 'next/server'

import { db } from '@/drizzle/db'
import { handleRoute } from '../shared'

export const GET = async () =>
    await handleRoute(async () => {
        const vendors = await db.query.VendorTable.findMany()
        return NextResponse.json(vendors)
    })
