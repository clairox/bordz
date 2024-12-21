import { NextResponse } from 'next/server'

import { db } from '@/drizzle/db'
import { handleRoute } from '../shared'

export const GET = async () =>
    await handleRoute(async () => {
        const sizes = await db.query.SizeTable.findMany()
        return NextResponse.json(sizes)
    })
