import { NextRequest, NextResponse } from 'next/server'

import { handleRoute, PostSizeSchema } from '../shared'
import { getSizes, createSize } from 'services/size'
import { chkRequest } from '@/lib/validator'

export const GET = async () =>
    await handleRoute(async () => {
        const sizes = await getSizes()
        return NextResponse.json(sizes)
    })

export const POST = async (request: NextRequest) =>
    await handleRoute(async () => {
        const { size } = await chkRequest(PostSizeSchema, request)
        const newSize = await createSize(size)
        return NextResponse.json(newSize)
    })
