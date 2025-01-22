import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import {
    BoardComponentAttrs,
    BoardComponents,
} from '@/drizzle/schema/boardComponent'
import { createInternalServerError, createNotFoundError } from '@/lib/errors'
import { handleRoute } from '../../shared'
import { DynamicRoutePropsWithParams } from '@/types/api'

type Props = DynamicRoutePropsWithParams<{ boardComponentId: string }>

export const GET = async (
    _: NextRequest,
    { params: { boardComponentId } }: Props
) =>
    await handleRoute(async () => {
        const boardComponent = await db.query.BoardComponents.findFirst({
            where: eq(BoardComponents.id, boardComponentId),
            with: {
                attrs: {
                    with: {
                        category: true,
                        size: true,
                        color: true,
                        vendor: true,
                    },
                },
            },
        })

        if (!boardComponent) {
            throw createNotFoundError('BoardComponent')
        }

        return NextResponse.json(boardComponent)
    })

export const PATCH = async (
    request: NextRequest,
    { params: { boardComponentId } }: Props
) =>
    await handleRoute(async () => {
        const data = await request.json()

        const updatedBoardComponent = await db
            .update(BoardComponents)
            .set({
                title: data.title,
                images: data.images,
                model: data.model,
                compareAtPrice: data.compareAtPrice,
                price: data.price,
                description: data.description,
                specifications: data.specifications,
                totalInventory: data.totalInventory,
                availableForSale: data.totalInventory > 0,
            })
            .where(eq(BoardComponents.id, boardComponentId))
            .returning()
            .then(rows => rows[0])

        // TODO: Update Drizzle to get .from()
        const updatedBoardComponentAttrs = await db
            .update(BoardComponentAttrs)
            .set({
                categoryId: data.category,
                vendorId: data.vendor,
                colorId: data.color,
                sizeId: data.size,
            })
            .where(eq(BoardComponentAttrs.boardComponentId, boardComponentId))
            .returning()
            .then(rows => getBoardComponentAttrs(rows[0].id))

        if (!updatedBoardComponentAttrs) {
            throw createInternalServerError()
        }

        return NextResponse.json({
            ...updatedBoardComponent,
            attrs: updatedBoardComponentAttrs,
        })
    })

const getBoardComponentAttrs = async (id: string) => {
    return await db.query.BoardComponentAttrs.findFirst({
        where: eq(BoardComponentAttrs.id, id),
        with: {
            category: true,
            vendor: true,
            size: true,
            color: true,
        },
    })
}
