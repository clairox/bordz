import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { BoardSetupTable } from '@/drizzle/schema/boardSetup'
import { ProductTable } from '@/drizzle/schema/product'
import {
    createBadRequestError,
    createInternalServerError,
    createNotFoundError,
    handleError,
} from '@/lib/errors'
import {
    getBoardSetup,
    getComponents,
    getComponentsOverallAvailability,
    getComponentsTotalPrice,
    getProduct,
} from '../../shared'
import { ComponentRecord } from '@/types/records'

export const GET = async (
    _: NextRequest,
    context: { params: { productId: string } }
) => {
    const { productId } = context.params

    try {
        const product = await db.query.ProductTable.findFirst({
            where: eq(ProductTable.id, productId),
            with: {
                boardSetup: true,
            },
        })

        if (!product) {
            throw createNotFoundError('Product')
        }

        return NextResponse.json(product)
    } catch (error) {
        return handleError(error as Error)
    }
}

const updateProduct = async (
    id: string,
    values: {
        title?: string
        price?: number
        availableForSale?: boolean
        featuredImage?: string
    }
) => {
    const updatedProduct = await db
        .update(ProductTable)
        .set({
            title: values.title,
            price: values.price,
            availableForSale: values.availableForSale,
            featuredImage: values.featuredImage,
            updatedAt: new Date(),
        })
        .where(eq(ProductTable.id, id))
        .returning()
        .then(async rows => await getProduct(rows[0].id))

    if (!updatedProduct) {
        throw createInternalServerError('Failed to update product.')
    }

    return updatedProduct
}

const updateBoardSetup = async (
    id: string,
    values: {
        deckId?: string
        trucksId?: string
        wheelsId?: string
        bearingsId?: string
        hardwareId?: string
        griptapeId?: string
    }
) => {
    const updatedBoardSetup = await db
        .update(BoardSetupTable)
        .set({
            deckId: values.deckId,
            trucksId: values.trucksId,
            wheelsId: values.wheelsId,
            bearingsId: values.bearingsId,
            hardwareId: values.hardwareId,
            griptapeId: values.griptapeId,
            updatedAt: new Date(),
        })
        .where(eq(BoardSetupTable.id, id))
        .returning()
        .then(async rows => await getBoardSetup(rows[0].id))

    if (!updatedBoardSetup) {
        throw createInternalServerError('Failed to update board setup')
    }

    return updatedBoardSetup
}

export const PATCH = async (
    request: NextRequest,
    context: { params: { productId: string } }
) => {
    const { productId } = context.params
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

            const updatedProduct = await updateProduct(productId, {
                price: totalPrice,
                availableForSale: availability,
            })

            const { deck, trucks, wheels, bearings, hardware, griptape } =
                validComponents

            await updateBoardSetup(updatedProduct.boardSetup!.id, {
                deckId: deck.id,
                trucksId: trucks.id,
                wheelsId: wheels.id,
                bearingsId: bearings.id,
                hardwareId: hardware.id,
                griptapeId: griptape.id,
            })

            return NextResponse.json(updatedProduct)
        } catch (error) {
            return handleError(error as Error)
        }
    } else {
        const { title, price, availableForSale, featuredImage } = requestBody

        try {
            const updatedProduct = await updateProduct(productId, {
                title,
                price,
                availableForSale,
                featuredImage,
            })

            return NextResponse.json(updatedProduct)
        } catch (error) {
            return handleError(error as Error)
        }
    }
}
