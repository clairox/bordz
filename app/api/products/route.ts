import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'

import { db } from '@/drizzle/db'
import { ProductTable } from '@/drizzle/schema/product'
import { BoardSetupTable } from '@/drizzle/schema/boardSetup'
import { ComponentTable } from '@/drizzle/schema/component'
import {
    createBadRequestError,
    createNotFoundError,
    handleError,
} from '@/lib/errors'

const defaultLimit = 40
const defaultOffset = 0

export const GET = async (request: NextRequest) => {
    const searchParams = request.nextUrl.searchParams
    const limit = Number(searchParams.get('limit') || defaultLimit)
    const offset = Number(searchParams.get('offset') || defaultOffset)

    try {
        const products = await db
            .select()
            .from(ProductTable)
            .limit(limit)
            .offset(offset)

        return NextResponse.json(products)
    } catch (error) {
        handleError(error)
    }
}

export const POST = async (request: NextRequest) => {
    const {
        isBoard,
        deckId,
        trucksId,
        wheelsId,
        bearingsId,
        hardwareId,
        griptapeId,
    } = await request.json()

    if (
        isBoard &&
        (!deckId ||
            !trucksId ||
            !wheelsId ||
            !bearingsId ||
            !hardwareId ||
            !griptapeId)
    ) {
        return handleError(createBadRequestError())
    }

    try {
        const components: Record<string, any> = {
            deck: null,
            trucks: null,
            wheels: null,
            bearings: null,
            hardware: null,
            griptape: null,
        }

        components['deck'] = await db.query.ComponentTable.findFirst({
            where: eq(ComponentTable.id, deckId),
        })
        components['trucks'] = await db.query.ComponentTable.findFirst({
            where: eq(ComponentTable.id, trucksId),
        })
        components['wheels'] = await db.query.ComponentTable.findFirst({
            where: eq(ComponentTable.id, wheelsId),
        })
        components['bearings'] = await db.query.ComponentTable.findFirst({
            where: eq(ComponentTable.id, bearingsId),
        })
        components['hardware'] = await db.query.ComponentTable.findFirst({
            where: eq(ComponentTable.id, hardwareId),
        })
        components['griptape'] = await db.query.ComponentTable.findFirst({
            where: eq(ComponentTable.id, griptapeId),
        })

        if (Object.values(components).find(component => component == null)) {
            throw createNotFoundError('Component')
        }

        let availableForSale = true

        if (
            Object.values(components).find(
                component => !component.availableForSale
            )
        ) {
            availableForSale = false
        }

        const productPrice = Object.values(components).reduce(
            (price, component) => price + component.price,
            0
        )

        const newProduct = await db
            .insert(ProductTable)
            .values({
                title: 'Complete Skateboard',
                price: productPrice,
                availableForSale,
                productType: 'BOARD',
            })
            .returning()
            .then(rows => rows[0])

        await db.insert(BoardSetupTable).values({
            productId: newProduct.id,
            deckId,
            trucksId,
            wheelsId,
            bearingsId,
            hardwareId,
            griptapeId,
        })

        return NextResponse.json(newProduct)
    } catch (error) {
        return handleError(error as Error)
    }
}
