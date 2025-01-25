import { NextRequest, NextResponse } from 'next/server'

import {
    getRequestOptionsParams,
    handleRoute,
    validateRequestBody,
} from '../shared'
import {
    createBoardComponent,
    deleteBoardComponents,
    getBoardComponents,
} from 'services/board'
import { createUrlHandle } from '@/utils/url'

export const GET = async (request: NextRequest) =>
    await handleRoute(async () => {
        const options = getRequestOptionsParams(request)
        const category = request.nextUrl.searchParams.get('category')
        const data = await getBoardComponents(category ?? undefined, options)
        return NextResponse.json(data)
    })

export const POST = async (request: NextRequest) =>
    await handleRoute(async () => {
        const data = await request.json()
        const requiredFields = [
            'title',
            'price',
            'totalInventory',
            'category',
            'vendor',
            'size',
            'color',
        ]
        validateRequestBody(data, requiredFields)

        const newComponent = await createBoardComponent({
            title: data.title,
            handle: createUrlHandle(data.title),
            price: parseInt(data.price),
            images: data.images,
            model: data.model,
            description: data.description,
            specifications: data.specifications,
            totalInventory: parseInt(data.totalInventory),
            category: data.category,
            vendor: data.vendor,
            size: data.size,
            color: data.color,
        })
        return NextResponse.json(newComponent)
    })

export const DELETE = async (request: NextRequest) =>
    await handleRoute(async () => {
        const data = await request.json()
        validateRequestBody(data, ['ids'])

        await deleteBoardComponents(data.ids)
        return new NextResponse(null, { status: 204 })
    })
