import { NextRequest, NextResponse } from 'next/server'
import { asc, count, desc, eq, inArray, SQL } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { Products } from '@/drizzle/schema/product'
import { Boards } from '@/drizzle/schema/board'
import { createNotFoundError } from '@/lib/errors'
import {
    calculateNextPageNumber,
    getBoardComponents,
    getBoardComponentsOverallAvailability,
    getBoardComponentsTotalPrice,
    getRequestOptionsParams,
    handleRoute,
    validateRequestBody,
} from '../shared'
import { BoardComponentRecord } from '@/types/database'
import { SortKey } from '@/types/sorting'
import { BoardComponents } from '@/drizzle/schema/boardComponent'

export const GET = async (request: NextRequest) =>
    await handleRoute(async () => {
        const { page, size, orderBy } = getRequestOptionsParams(request)
        const publicOnly =
            request.nextUrl.searchParams.get('publicOnly') === 'true'
                ? true
                : false

        const sorts: Partial<Record<SortKey, SQL>> = {
            'date-desc': desc(Products.createdAt),
            'date-asc': asc(Products.createdAt),
            'price-desc': desc(Products.price),
            'price-asc': asc(Products.price),
        }

        const where = publicOnly ? eq(Products.isPublic, true) : undefined

        const products = await db.query.Products.findMany({
            where,
            limit: size,
            offset: (page - 1) * size,
            orderBy: sorts[orderBy],
        })

        const nextPage = await calculateNextPageNumber(
            page,
            size,
            Products,
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

            const { deck, trucks, wheels, bearings, hardware, griptape } =
                validBoardComponents

            const numberOfBoardsWithSameDeck = await db
                .select({ count: count() })
                .from(Boards)
                .innerJoin(
                    BoardComponents,
                    eq(Boards.deckId, BoardComponents.id)
                )
                .where(eq(BoardComponents.title, deck.title))
                .then(rows => rows[0].count)

            const baseTitle = deck.title.toLowerCase().endsWith(' deck')
                ? deck.title.slice(0, -5)
                : deck.title
            const productTitle = `${baseTitle} Complete #${numberOfBoardsWithSameDeck + 1}`

            const newProduct = await createProduct(
                productTitle,
                totalPrice,
                'BOARD',
                availability,
                deck.images?.[0],
                data.isPublic
            )

            await db.insert(Boards).values({
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

        await db.delete(Products).where(inArray(Products.id, data.ids))
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
        .insert(Products)
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
