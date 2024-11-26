import { db } from '@/drizzle/db'
import { BoardSetupTable } from '@/drizzle/schema/boardSetup'
import { ComponentTable } from '@/drizzle/schema/component'
import { ProductTable } from '@/drizzle/schema/product'
import {
    createBadRequestError,
    createNotFoundError,
    handleError,
} from '@/lib/errors'
import { eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

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

export const PATCH = async (
    request: NextRequest,
    context: { params: { productId: string } }
) => {
    const { productId } = context.params
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

        await db
            .update(ProductTable)
            .set({
                price: productPrice,
                availableForSale,
                updatedAt: new Date(),
            })
            .where(eq(ProductTable.id, productId))

        const updatedBoardSetup = await db
            .update(BoardSetupTable)
            .set({
                deckId,
                trucksId,
                wheelsId,
                bearingsId,
                hardwareId,
                griptapeId,
                updatedAt: new Date(),
            })
            .where(eq(BoardSetupTable.productId, productId))
            .returning()
            .then(rows => rows[0])

        return NextResponse.json(updatedBoardSetup)
    } catch (error) {
        return handleError(error as Error)
    }
}
