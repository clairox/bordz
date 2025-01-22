import { NextRequest, NextResponse } from 'next/server'

import { db } from '@/drizzle/db'
import { handleRoute, validateRequestBody } from '../shared'
import { Colors } from '@/drizzle/schema/boardComponent'

export const GET = async () =>
    await handleRoute(async () => {
        const colors = await db.query.Colors.findMany()
        return NextResponse.json(colors)
    })

export const POST = async (request: NextRequest) =>
    await handleRoute(async () => {
        const data = await request.json()
        validateRequestBody(data, ['label, value'])

        const newColor = await db
            .insert(Colors)
            .values({ label: data.label, value: data.value })
            .returning()
            .then(rows => rows[0])
        return NextResponse.json(newColor)
    })
