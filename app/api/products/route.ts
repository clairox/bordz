import { NextRequest, NextResponse } from 'next/server'

import {
    DeleteProductsSchema,
    getRequestOptionsParams,
    handleRoute,
    PostProductSchema,
} from '../shared'
import { createProduct, deleteProducts, getProducts } from 'services/product'
import { chkRequest } from '@/lib/validator'

export const GET = async (request: NextRequest) =>
    await handleRoute(async () => {
        const searchParams = request.nextUrl.searchParams

        const options = getRequestOptionsParams(request)
        const publicOnly = searchParams.get('publicOnly') === 'true' || false
        const available = searchParams.get('available') === 'true' || false
        const data = await getProducts({
            ...options,
            publicOnly,
            available,
        })
        return NextResponse.json(data)
    })

export const POST = async (request: NextRequest) =>
    await handleRoute(async () => {
        const data = await chkRequest(PostProductSchema, request)
        const newProduct = await createProduct(data)

        return NextResponse.json(newProduct)
    })

export const DELETE = async (request: NextRequest) =>
    await handleRoute(async () => {
        const { ids } = await chkRequest(DeleteProductsSchema, request)
        await deleteProducts(ids)
        return new NextResponse(null, { status: 204 })
    })
