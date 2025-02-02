import { NextRequest, NextResponse } from 'next/server'

import { handleRoute, PostColorSchema } from '../shared'
import { getColors, createColor } from 'services/color'
import { chkRequest } from '@/lib/validator'

export const GET = async () =>
    await handleRoute(async () => {
        const colors = await getColors()
        return NextResponse.json(colors)
    })

export const POST = async (request: NextRequest) =>
    await handleRoute(async () => {
        const { label, value } = await chkRequest(PostColorSchema, request)
        const newColor = await createColor(label, value)
        return NextResponse.json(newColor)
    })
