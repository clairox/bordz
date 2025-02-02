import { NextRequest, NextResponse } from 'next/server'

import {
    DeleteBoardComponentSchema,
    getRequestOptionsParams,
    handleRoute,
    PostBoardComponentSchema,
} from '../shared'
import {
    createBoardComponent,
    deleteBoardComponents,
    getBoardComponents,
} from 'services/board'
import { chkRequest } from '@/lib/validator'

export const GET = async (request: NextRequest) =>
    await handleRoute(async () => {
        const options = getRequestOptionsParams(request)
        const category = request.nextUrl.searchParams.get('category')
        const data = await getBoardComponents(category ?? undefined, options)
        return NextResponse.json(data)
    })

export const POST = async (request: NextRequest) =>
    await handleRoute(async () => {
        const data = await chkRequest(PostBoardComponentSchema, request)
        const newComponent = await createBoardComponent(data)
        return NextResponse.json(newComponent)
    })

export const DELETE = async (request: NextRequest) =>
    await handleRoute(async () => {
        const { ids } = await chkRequest(DeleteBoardComponentSchema, request)
        await deleteBoardComponents(ids)
        return new NextResponse(null, { status: 204 })
    })
