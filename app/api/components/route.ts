import { NextRequest, NextResponse } from 'next/server'

import { db } from '@/drizzle/db'
import { handleError } from '@/lib/errors'
import {
    CategoryTable,
    ColorTable,
    ComponentAttributesTable,
    ComponentTable,
    SizeTable,
    VendorTable,
} from '@/drizzle/schema/component'
import { eq } from 'drizzle-orm'
import { json } from 'drizzle-orm/pg-core'

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
