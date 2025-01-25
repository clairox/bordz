import { NextRequest, NextResponse } from 'next/server'

import { handleRoute, validateRequestBody } from '../shared'
import { getColors, createColor } from 'services/color'

export const GET = async () =>
    await handleRoute(async () => {
        const colors = await getColors()
        return NextResponse.json(colors)
    })

export const POST = async (request: NextRequest) =>
    await handleRoute(async () => {
        const data = await request.json()
        validateRequestBody(data, ['label, value'])

        const newColor = await createColor(data.label, data.value)
        return NextResponse.json(newColor)
    })
