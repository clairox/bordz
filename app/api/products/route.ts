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

const defaultLimit = 40
const defaultOffset = 0

export const GET = async (request: NextRequest) => {
    const searchParams = request.nextUrl.searchParams
    const limit = Number(searchParams.get('limit') || defaultLimit)
    const offset = Number(searchParams.get('offset') || defaultOffset)

    try {
        const products = await db.query.ProductTable.findMany({
            limit,
            offset,
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

        return NextResponse.json(products)
    } catch (error) {
        handleError(error)
    }
}

const createProduct = async (
    title: string,
    price: number,
    type: 'BOARD' | 'OTHER',
    availableForSale: boolean = true,
    featuredImage?: string
) => {
    return await db
        .insert(ProductTable)
        .values({
            title: title,
            price: price,
            productType: type,
            availableForSale: availableForSale,
            featuredImage: featuredImage,
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
                availability
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
                availableForSale,
                featuredImage
            )

            return NextResponse.json(newProduct)
        } catch (error) {
            return handleError(error as Error)
        }
    }
}
