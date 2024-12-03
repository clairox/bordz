import { NextRequest, NextResponse } from 'next/server'

import { db } from '@/drizzle/db'
import { createBadRequestError, handleError } from '@/lib/errors'
import {
    CategoryTable,
    ColorTable,
    ComponentAttributesTable,
    ComponentTable,
    SizeTable,
    VendorTable,
} from '@/drizzle/schema/component'
import { eq } from 'drizzle-orm'
import { createUrlHandle } from '@/utils/helpers'

export const GET = async (request: NextRequest) => {
    const category = request.nextUrl.searchParams.get('category')
    try {
        let components

        if (category) {
            components = await db
                .select()
                .from(ComponentTable)
                .innerJoin(
                    ComponentAttributesTable,
                    eq(ComponentTable.id, ComponentAttributesTable.componentId)
                )
                .innerJoin(
                    CategoryTable,
                    eq(ComponentAttributesTable.categoryId, CategoryTable.id)
                )
                .innerJoin(
                    SizeTable,
                    eq(ComponentAttributesTable.sizeId, SizeTable.id)
                )
                .innerJoin(
                    ColorTable,
                    eq(ComponentAttributesTable.colorId, ColorTable.id)
                )
                .innerJoin(
                    VendorTable,
                    eq(ComponentAttributesTable.vendorId, VendorTable.id)
                )
                .where(eq(CategoryTable.label, category))
                .then(rows => {
                    return rows.map(row => {
                        return {
                            ...row.components,
                            componentAttributes: {
                                ...row.component_attributes,
                                category: { ...row.categories },
                                size: { ...row.sizes },
                                color: { ...row.colors },
                                vendor: { ...row.vendors },
                            },
                        }
                    })
                })
        } else {
            components = await db.query.ComponentTable.findMany({
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
        }

        return NextResponse.json(components)
    } catch (error) {
        return handleError(error as Error)
    }
}

export const POST = async (request: NextRequest) => {
    const {
        title,
        price,
        images,
        model,
        description,
        specifications,
        totalInventory,
        category,
        vendor,
        size,
        color,
    } = await request.json()

    if (
        !title ||
        !price ||
        !totalInventory ||
        !category ||
        !vendor ||
        !size ||
        !color
    ) {
        return handleError(createBadRequestError())
    }

    try {
        const component = await db
            .insert(ComponentTable)
            .values({
                title,
                handle: createUrlHandle(title),
                price: parseInt(price),
                featuredImage: images?.[0] || undefined,
                images: images || [],
                model,
                description,
                specifications,
                totalInventory: parseInt(totalInventory),
                availableForSale: totalInventory > 0,
            })
            .returning()
            .then(rows => rows[0])

        await db.insert(ComponentAttributesTable).values({
            componentId: component.id,
            categoryId: category,
            vendorId: vendor,
            sizeId: size,
            colorId: color,
        })

        return NextResponse.json(component)
    } catch (error) {
        return handleError(error as Error)
    }
}
