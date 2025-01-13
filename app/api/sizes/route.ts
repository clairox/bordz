import { NextRequest, NextResponse } from 'next/server'

import { db } from '@/drizzle/db'
import { handleRoute, validateRequestBody } from '../shared'
import { SizeTable } from '@/drizzle/schema/component'

export const GET = async () =>
    await handleRoute(async () => {
        const sizes = await db.query.SizeTable.findMany()
        return NextResponse.json(sizes)
    })

export const POST = async (request: NextRequest) =>
    await handleRoute(async () => {
        const data = await request.json()
        validateRequestBody(data, ['size'])

        const newSize = await db
            .insert(SizeTable)
            .values({ label: data.size })
            .returning()
            .then(rows => rows[0])
        return NextResponse.json(newSize)
    })
