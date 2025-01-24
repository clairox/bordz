import { NextRequest, NextResponse } from 'next/server'

import { handleRoute } from '../../shared'
import { DynamicRoutePropsWithParams } from '@/types/api'
import { getProduct, updateProduct } from 'services/product'

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
        const data = await request.json()
        const updatedProduct = await updateProduct(productId, {
            title: data.title,
            price: data.price,
            featuredImage: data.featuredImage,
            availableForSale: data.availableForSale,
            isPublic: data.isPublic,
        })
        return NextResponse.json(updatedProduct)
    })
