import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { Boards } from '@/drizzle/schema/board'
import { Products } from '@/drizzle/schema/product'
import { createInternalServerError, createNotFoundError } from '@/lib/errors'
import {
    getBoard,
    getBoardComponents,
    getBoardComponentsOverallAvailability,
    getBoardComponentsTotalPrice,
    getProduct,
    handleRoute,
    validateRequestBody,
} from '../../shared'
import { BoardComponentRecord } from '@/types/database'
import { DynamicRoutePropsWithParams } from '@/types/api'

type Props = DynamicRoutePropsWithParams<{ productId: string }>

export const GET = async (_: NextRequest, { params: { productId } }: Props) =>
    await handleRoute(async () => {
        const product = await db.query.Products.findFirst({
            where: eq(Products.id, productId),
        })

        if (!product) {
            throw createNotFoundError('Product')
        }

        return NextResponse.json(product)
    })

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

            const boardComponents = await getBoardComponents({
                deckId: data.deckId,
                trucksId: data.trucksId,
                wheelsId: data.wheelsId,
                bearingsId: data.bearingsId,
                hardwareId: data.hardwareId,
                griptapeId: data.griptapeId,
            })

            if (
                Object.values(boardComponents).some(
                    boardComponent => boardComponent == null
                )
            ) {
                throw createNotFoundError('BoardComponent')
            }

            const validBoardComponents = boardComponents as Record<
                string,
                BoardComponentRecord
            >

            const totalPrice =
                getBoardComponentsTotalPrice(validBoardComponents)
            const availability =
                getBoardComponentsOverallAvailability(validBoardComponents)

            const updatedProduct = await updateProduct(productId, {
                price: totalPrice,
                availableForSale: availability,
                isPublic: data.isPublic,
            })

            const { deck, trucks, wheels, bearings, hardware, griptape } =
                validBoardComponents

            await updateBoard(updatedProduct.board!.id, {
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
        .update(Products)
        .set({
            title: values.title,
            price: values.price,
            availableForSale: values.availableForSale,
            featuredImage: values.featuredImage,
            isPublic: values.isPublic,
            updatedAt: new Date(),
        })
        .where(eq(Products.id, id))
        .returning()
        .then(async rows => await getProduct(rows[0].id))

    if (!updatedProduct) {
        throw createInternalServerError('Failed to update product.')
    }

    return updatedProduct
}

const updateBoard = async (
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
    const updatedBoard = await db
        .update(Boards)
        .set({
            deckId: values.deckId,
            trucksId: values.trucksId,
            wheelsId: values.wheelsId,
            bearingsId: values.bearingsId,
            hardwareId: values.hardwareId,
            griptapeId: values.griptapeId,
            updatedAt: new Date(),
        })
        .where(eq(Boards.id, id))
        .returning()
        .then(async rows => await getBoard(rows[0].id))

    if (!updatedBoard) {
        throw createInternalServerError('Failed to update board setup')
    }

    return updatedBoard
}
