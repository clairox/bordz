import { NextResponse } from 'next/server'

import { db } from '@/drizzle/db'
import { handleRoute } from '../shared'

export const GET = async () =>
    await handleRoute(async () => {
        const colors = await db.query.ColorTable.findMany()
        return NextResponse.json(colors)
    })
