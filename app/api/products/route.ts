import { NextRequest, NextResponse } from 'next/server'

import {
    getRequestOptionsParams,
    handleRoute,
    validateRequestBody,
} from '../shared'
import { createProduct, deleteProducts, getProducts } from 'services/product'

export const GET = async (request: NextRequest) =>
    await handleRoute(async () => {
        const searchParams = request.nextUrl.searchParams

        const options = getRequestOptionsParams(request)
        const publicOnly = searchParams.get('publicOnly') === 'true' || false
        const data = await getProducts(publicOnly, options)
        return NextResponse.json(data)
    })

export const POST = async (request: NextRequest) =>
    await handleRoute(async () => {
        const data = await request.json()
        validateRequestBody(data, ['title', 'price', 'type'])

        const newProduct = await createProduct({
            title: data.title,
            featuredImage: data.featuredImage,
            price: data.price,
            type: data.type,
            availableForSale: data.availableForSale,
            isPublic: data.isPublic,
        })

        return NextResponse.json(newProduct)
    })

export const DELETE = async (request: NextRequest) =>
    await handleRoute(async () => {
        const data = await request.json()
        validateRequestBody(data, ['ids'])
        await deleteProducts(data.ids)
        return new NextResponse(null, { status: 204 })
    })
