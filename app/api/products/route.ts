import { NextRequest, NextResponse } from 'next/server'

import { db } from '@/drizzle/db'
import { ProductTable } from '@/drizzle/schema/product'
import { BoardSetupTable } from '@/drizzle/schema/boardSetup'
import {
    createBadRequestError,
    createNotFoundError,
    handleError,
} from '@/lib/errors'
import {
    getComponents,
    getComponentsOverallAvailability,
    getComponentsTotalPrice,
} from '../shared'
import { ComponentRecord } from '@/types/records'
import { count, eq } from 'drizzle-orm'

const defaultLimit = 40
const defaultPage = 1

export const GET = async (request: NextRequest) => {
    const searchParams = request.nextUrl.searchParams
    const pageSize = Number(searchParams.get('size') || defaultLimit)
    const page = Number(searchParams.get('page') || defaultPage)
    const publicOnly = searchParams.get('publicOnly') === 'true' ? true : false

    try {
        const products = await db.query.ProductTable.findMany({
            where: publicOnly ? eq(ProductTable.isPublic, true) : undefined,
            limit: pageSize,
            offset: (page - 1) * pageSize,
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

        const productCount = await db
            .select({ count: count() })
            .from(ProductTable)
            .then(rows => rows[0].count)
        const totalPages = Math.ceil(productCount / pageSize)
        const nextPage = totalPages > page ? page + 1 : undefined

        return NextResponse.json({ data: products, nextPage })
    } catch (error) {
        handleError(error)
    }
}

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

export const POST = async (request: NextRequest) => {
    const requestBody = await request.json()

    const { type } = requestBody

    if (type === 'board') {
        const {
            deckId,
            isPublic,
            trucksId,
            wheelsId,
            bearingsId,
            hardwareId,
            griptapeId,
        } = requestBody

        if (
            !(
                deckId &&
                trucksId &&
                wheelsId &&
                bearingsId &&
                hardwareId &&
                griptapeId
            )
        ) {
            return handleError(createBadRequestError('Missing component.'))
        }

        try {
            const components = await getComponents({
                deckId,
                trucksId,
                wheelsId,
                bearingsId,
                hardwareId,
                griptapeId,
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
                isPublic
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
        } catch (error) {
            return handleError(error as Error)
        }
    } else {
        const { title, price, featuredImage, availableForSale } = requestBody

        if (!title || !price) {
            return handleError(createBadRequestError())
        }

        try {
            const newProduct = await createProduct(
                title,
                price,
                'OTHER',
                availableForSale,
                featuredImage,
                true
            )

            return NextResponse.json(newProduct)
        } catch (error) {
            return handleError(error as Error)
        }
    }
}
