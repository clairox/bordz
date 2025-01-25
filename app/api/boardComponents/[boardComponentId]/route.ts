import { NextRequest, NextResponse } from 'next/server'

import { handleRoute } from '../../shared'
import { DynamicRoutePropsWithParams } from '@/types/api'
import { getBoardComponent, updateBoardComponent } from 'services/board'

type Props = DynamicRoutePropsWithParams<{ boardComponentId: string }>

export const GET = async (
    _: NextRequest,
    { params: { boardComponentId } }: Props
) =>
    await handleRoute(async () => {
        const boardComponent = await getBoardComponent(boardComponentId)
        return NextResponse.json(boardComponent)
    })

export const PATCH = async (
    request: NextRequest,
    { params: { boardComponentId } }: Props
) =>
    await handleRoute(async () => {
        const data = await request.json()

        const updatedBoardComponent = await updateBoardComponent(
            boardComponentId,
            {
                title: data.title,
                images: data.images,
                model: data.model,
                compareAtPrice: data.compareAtPrice,
                price: data.price,
                description: data.description,
                specifications: data.specifications,
                totalInventory: data.totalInventory,
                category: data.category,
                vendor: data.vendor,
                size: data.size,
                color: data.color,
            }
        )
        return NextResponse.json(updatedBoardComponent)
    })
