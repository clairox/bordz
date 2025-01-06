import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import {
    ComponentAttributesTable,
    ComponentTable,
} from '@/drizzle/schema/component'
import { createInternalServerError, createNotFoundError } from '@/lib/errors'
import { handleRoute } from '../../shared'

type Props = DynamicRoutePropsWithParams<{ componentId: string }>

export const GET = async (_: NextRequest, { params: { componentId } }: Props) =>
    await handleRoute(async () => {
        const component = await db.query.ComponentTable.findFirst({
            where: eq(ComponentTable.id, componentId),
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
            .update(ComponentTable)
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
            .where(eq(ComponentTable.id, componentId))
            .returning()
            .then(rows => rows[0])

        // TODO: Update Drizzle to get .from()
        const updatedComponentAttrs = await db
            .update(ComponentAttributesTable)
            .set({
                categoryId: data.category,
                vendorId: data.vendor,
                colorId: data.color,
                sizeId: data.size,
            })
            .where(eq(ComponentAttributesTable.componentId, componentId))
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
    return await db.query.ComponentAttributesTable.findFirst({
        where: eq(ComponentAttributesTable.id, id),
        with: {
            category: true,
            vendor: true,
            size: true,
            color: true,
        },
    })
}
