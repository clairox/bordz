import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { BoardSetupTable } from '@/drizzle/schema/boardSetup'
import { ProductTable } from '@/drizzle/schema/product'
import { createInternalServerError, createNotFoundError } from '@/lib/errors'
import {
    getBoardSetup,
    getComponents,
    getComponentsOverallAvailability,
    getComponentsTotalPrice,
    getProduct,
    handleRoute,
    validateRequestBody,
} from '../../shared'
import { ComponentRecord } from '@/types/database'
import { DynamicRoutePropsWithParams } from '@/types/api'

type Props = DynamicRoutePropsWithParams<{ productId: string }>

export const GET = async (_: NextRequest, { params: { productId } }: Props) =>
    await handleRoute(async () => {
        const product = await db.query.ProductTable.findFirst({
            where: eq(ProductTable.id, productId),
        })

        if (!product) {
            throw createNotFoundError('Product')
        }

        return NextResponse.json(product)
    })

// TODO: Update product and board setup OR just product idk
export const PATCH = async (
    request: NextRequest,
    { params: { productId } }: Props
) =>
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

            const updatedProduct = await updateProduct(productId, {
                price: totalPrice,
                availableForSale: availability,
                isPublic: data.isPublic,
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
        } else {
            const updatedProduct = await updateProduct(productId, {
                title: data.title,
                price: data.price,
                availableForSale: data.availableForSale,
                featuredImage: data.featuredImage,
                isPublic: data.isPublic,
            })

            return NextResponse.json(updatedProduct)
        }
    })

const updateProduct = async (
    id: string,
    values: {
        title?: string
        price?: number
        availableForSale?: boolean
        featuredImage?: string
        isPublic?: boolean
    }
) => {
    const updatedProduct = await db
        .update(ProductTable)
        .set({
            title: values.title,
            price: values.price,
            availableForSale: values.availableForSale,
            featuredImage: values.featuredImage,
            isPublic: values.isPublic,
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
