import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import {
    BoardComponentAttrs,
    BoardComponents,
} from '@/drizzle/schema/component'
import { createInternalServerError, createNotFoundError } from '@/lib/errors'
import { handleRoute } from '../../shared'
import { DynamicRoutePropsWithParams } from '@/types/api'

type Props = DynamicRoutePropsWithParams<{ componentId: string }>

export const GET = async (_: NextRequest, { params: { componentId } }: Props) =>
    await handleRoute(async () => {
        const component = await db.query.BoardComponents.findFirst({
            where: eq(BoardComponents.id, componentId),
            with: {
                componentAttributes: {
                    with: {
                        category: true,
                        size: true,
                        color: true,
                        vendor: true,
                    },
                },
            },
        })

        if (!component) {
            throw createNotFoundError('Component')
        }

        return NextResponse.json(component)
    })

export const PATCH = async (
    request: NextRequest,
    { params: { componentId } }: Props
) =>
    await handleRoute(async () => {
        const data = await request.json()

        const updatedComponent = await db
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
            .where(eq(BoardComponents.id, componentId))
            .returning()
            .then(rows => rows[0])

        // TODO: Update Drizzle to get .from()
        const updatedComponentAttrs = await db
            .update(BoardComponentAttrs)
            .set({
                categoryId: data.category,
                vendorId: data.vendor,
                colorId: data.color,
                sizeId: data.size,
            })
            .where(eq(BoardComponentAttrs.componentId, componentId))
            .returning()
            .then(rows => getComponentAttrs(rows[0].id))

        if (!updatedComponentAttrs) {
            throw createInternalServerError()
        }

        return NextResponse.json({
            ...updatedComponent,
            componentAttributes: updatedComponentAttrs,
        })
    })

const getComponentAttrs = async (id: string) => {
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
