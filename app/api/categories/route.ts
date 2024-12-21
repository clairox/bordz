import { NextResponse } from 'next/server'

import { db } from '@/drizzle/db'
import { handleRoute } from '../shared'

export const GET = async () =>
    await handleRoute(async () => {
        const categories = await db.query.CategoryTable.findMany()
        return NextResponse.json(categories)
    })
