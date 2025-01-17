import { NextRequest, NextResponse } from 'next/server'

import { db } from '@/drizzle/db'
import {
    CategoryTable,
    ColorTable,
    ComponentAttributesTable,
    ComponentTable,
    SizeTable,
    VendorTable,
} from '@/drizzle/schema/component'
import { count, desc, eq, inArray } from 'drizzle-orm'
import { createUrlHandle } from '@/utils/url'
import {
    getRequestOptionsParams,
    handleRoute,
    validateRequestBody,
} from '../shared'
import { DEFAULT_PAGE_SIZE } from '@/utils/constants'
import { SortKey } from '@/types/sorting'

export const GET = async (request: NextRequest) =>
    await handleRoute(async () => {
        const { page, size, orderBy } = getRequestOptionsParams(request)
        const category = request.nextUrl.searchParams.get('category')
        const components = await getComponents(category, {
            limit: size,
            offset: (page - 1) * size,
            orderBy,
        })

        const componentCount = await getComponentCount(category)
        const totalPages = Math.ceil(componentCount / size)
        const nextPage = totalPages > page ? page + 1 : undefined

        return NextResponse.json({ data: components, nextPage })
    })

export const POST = async (request: NextRequest) =>
    await handleRoute(async () => {
        const data = await request.json()
        const requiredFields = [
            'title',
            'price',
            'totalInventory',
            'category',
            'vendor',
            'size',
            'color',
        ]
        validateRequestBody(data, requiredFields)

        const component = await db
            .insert(ComponentTable)
            .values({
                title: data.title,
                handle: createUrlHandle(data.title),
                price: parseInt(data.price),
                images: data.images,
                model: data.model,
                description: data.description,
                specifications: data.specifications,
                totalInventory: parseInt(data.totalInventory),
                availableForSale: data.totalInventory > 0,
            })
            .returning()
            .then(rows => rows[0])

        await db.insert(ComponentAttributesTable).values({
            componentId: component.id,
            categoryId: data.category,
            vendorId: data.vendor,
            sizeId: data.size,
            colorId: data.color,
        })

        const newComponent = await db.query.ComponentTable.findFirst({
            where: eq(ComponentTable.id, component.id),
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

        return NextResponse.json(newComponent)
    })

export const DELETE = async (request: NextRequest) =>
    await handleRoute(async () => {
        const data = await request.json()
        validateRequestBody(data, ['ids'])

        await db
            .delete(ComponentTable)
            .where(inArray(ComponentTable.id, data.ids))
        return new NextResponse(null, { status: 204 })
    })

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
        .offset(options?.offset || 0)
        .orderBy(desc(ComponentTable.createdAt))
        .limit(options?.limit || DEFAULT_PAGE_SIZE)
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
