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
import { count, eq } from 'drizzle-orm'
import { createUrlHandle } from '@/utils/helpers'

const defaultLimit = 40
const defaultPage = 1

export const GET = async (request: NextRequest) => {
    const searchParams = request.nextUrl.searchParams
    const pageSize = Number(searchParams.get('size') || defaultLimit)
    const page = Number(searchParams.get('page') || defaultPage)

    const category = request.nextUrl.searchParams.get('category')
    try {
        const components = await getComponents(category, {
            limit: pageSize,
            offset: (page - 1) * pageSize,
        })

        const componentCount = await getComponentCount(category)
        const totalPages = Math.ceil(componentCount / pageSize)
        const nextPage = totalPages > page ? page + 1 : undefined

        // let components
        //
        // if (category) {
        //     components = await getComponents(category)
        // } else {
        //     components = await db.query.ComponentTable.findMany({
        //         with: {
        //             componentAttributes: {
        //                 with: {
        //                     category: true,
        //                     size: true,
        //                     color: true,
        //                     vendor: true,
        //                 },
        //             },
        //         },
        //     })
        // }

        return NextResponse.json({ data: components, nextPage })
    } catch (error) {
        return handleError(error as Error)
    }
}

export const POST = async (request: NextRequest) => {
    const {
        title,
        price,
        image,
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
                image: image,
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

type GetComponentsOptions = {
    limit?: number
    offset?: number
    orderBy?: SortKey
    size?: string | null
    color?: string | null
    vendor?: string | null
}

const getComponents = async (
    category?: string | null,
    options?: GetComponentsOptions
) => {
    return await db
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
        .innerJoin(SizeTable, eq(ComponentAttributesTable.sizeId, SizeTable.id))
        .innerJoin(
            ColorTable,
            eq(ComponentAttributesTable.colorId, ColorTable.id)
        )
        .innerJoin(
            VendorTable,
            eq(ComponentAttributesTable.vendorId, VendorTable.id)
        )
        .where(category ? eq(CategoryTable.label, category) : undefined)
        .limit(options?.limit || defaultLimit)
        .offset(options?.offset || 0)
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
}

const getComponentCount = async (
    category?: string | null,
    options?: Omit<GetComponentsOptions, 'limit' | 'offset' | 'orderBy'>
) => {
    return await db
        .select({ count: count() })
        .from(ComponentTable)
        .innerJoin(
            ComponentAttributesTable,
            eq(ComponentTable.id, ComponentAttributesTable.componentId)
        )
        .innerJoin(
            CategoryTable,
            eq(ComponentAttributesTable.categoryId, CategoryTable.id)
        )
        .innerJoin(SizeTable, eq(ComponentAttributesTable.sizeId, SizeTable.id))
        .innerJoin(
            ColorTable,
            eq(ComponentAttributesTable.colorId, ColorTable.id)
        )
        .innerJoin(
            VendorTable,
            eq(ComponentAttributesTable.vendorId, VendorTable.id)
        )
        .where(category ? eq(CategoryTable.label, category) : undefined)
        .then(rows => rows[0].count)
}
