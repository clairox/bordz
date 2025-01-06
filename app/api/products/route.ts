import { NextRequest, NextResponse } from 'next/server'
import { asc, desc, eq, inArray, SQL } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { ProductTable } from '@/drizzle/schema/product'
import { BoardSetupTable } from '@/drizzle/schema/boardSetup'
import { createNotFoundError } from '@/lib/errors'
import {
    calculateNextPageNumber,
    getComponents,
    getComponentsOverallAvailability,
    getComponentsTotalPrice,
    getRequestOptionsParams,
    handleRoute,
    validateRequestBody,
} from '../shared'
import { ComponentRecord } from '@/types/records'

export const GET = async (request: NextRequest) =>
    await handleRoute(async () => {
        const { page, size, orderBy } = getRequestOptionsParams(request)
        const publicOnly =
            request.nextUrl.searchParams.get('publicOnly') === 'true'
                ? true
                : false

        const sorts: Partial<Record<SortKey, SQL>> = {
            'date-desc': desc(ProductTable.createdAt),
            'date-asc': asc(ProductTable.createdAt),
            'price-desc': desc(ProductTable.price),
            'price-asc': asc(ProductTable.price),
        }

        const where = publicOnly ? eq(ProductTable.isPublic, true) : undefined

        const products = await db.query.ProductTable.findMany({
            where,
            limit: size,
            offset: (page - 1) * size,
            orderBy: sorts[orderBy],
            with: {
                boardSetup: {
                    with: {
                        deck: true,
                        trucks: true,
                        wheels: true,
                        bearings: true,
                        hardware: true,
                        griptape: true,
                    },
                },
            },
        })

        const nextPage = await calculateNextPageNumber(
            page,
            size,
            ProductTable,
            where
        )

        return NextResponse.json({ data: products, nextPage })
    })

export const POST = async (request: NextRequest) =>
    await handleRoute(async () => {
        const data = await request.json()

        if (data.type === 'board') {
            const requiredFields = [
                'deckId',
                'trucksId',
                'wheelsId',
                'bearingsId',
                'hardwareId',
                'griptapeId',
            ]
            validateRequestBody(data, requiredFields)

            const components = await getComponents({
                deckId: data.deckId,
                trucksId: data.trucksId,
                wheelsId: data.wheelsId,
                bearingsId: data.bearingsId,
                hardwareId: data.hardwareId,
                griptapeId: data.griptapeId,
            })

            if (
                Object.values(components).some(component => component == null)
            ) {
                throw createNotFoundError('Component')
            }

            const validComponents = components as Record<
                string,
                ComponentRecord
            >

            const totalPrice = getComponentsTotalPrice(validComponents)
            const availability =
                getComponentsOverallAvailability(validComponents)

            const newProduct = await createProduct(
                'Complete Skateboard',
                totalPrice,
                'BOARD',
                availability,
                undefined,
                data.isPublic
            )

            const { deck, trucks, wheels, bearings, hardware, griptape } =
                validComponents

            await db.insert(BoardSetupTable).values({
                productId: newProduct.id,
                deckId: deck.id,
                trucksId: trucks.id,
                wheelsId: wheels.id,
                bearingsId: bearings.id,
                hardwareId: hardware.id,
                griptapeId: griptape.id,
            })

            return NextResponse.json(newProduct)
        } else {
            validateRequestBody(data, ['title', 'price'])

            const newProduct = await createProduct(
                data.title,
                data.price,
                'OTHER',
                data.availableForSale,
                data.featuredImage,
                true
            )

            return NextResponse.json(newProduct)
        }
    })

export const DELETE = async (request: NextRequest) =>
    await handleRoute(async () => {
        const data = await request.json()
        validateRequestBody(data, ['ids'])

        await db.delete(ProductTable).where(inArray(ProductTable.id, data.ids))
        return new NextResponse(null, { status: 204 })
    })

const createProduct = async (
    title: string,
    price: number,
    type: 'BOARD' | 'OTHER',
    availableForSale: boolean = true,
    featuredImage?: string,
    isPublic?: boolean
) => {
    return await db
        .insert(ProductTable)
        .values({
            title: title,
            price: price,
            productType: type,
            availableForSale: availableForSale,
            featuredImage: featuredImage,
            isPublic: isPublic,
        })
        .returning()
        .then(rows => rows[0])
}
