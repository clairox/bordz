import { NextRequest, NextResponse } from 'next/server'

import { handleRoute, PatchProductSchema } from '../../shared'
import { DynamicRoutePropsWithParams } from '@/types/api'
import { getProduct, updateProduct } from 'services/product'
import { chkRequest } from '@/lib/validator'

type Props = DynamicRoutePropsWithParams<{ productId: string }>

export const GET = async (_: NextRequest, { params: { productId } }: Props) =>
    await handleRoute(async () => {
        const product = await getProduct(productId)
        return NextResponse.json(product)
    })

export const PATCH = async (
    request: NextRequest,
    { params: { productId } }: Props
) =>
    await handleRoute(async () => {
        const data = await chkRequest(PatchProductSchema, request)
        const updatedProduct = await updateProduct(productId, data)
        return NextResponse.json(updatedProduct)
    })
