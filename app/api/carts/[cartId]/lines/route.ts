import handleError from '@/lib/errorHandling'
import { db } from '@/db'
import { CartLineItemTable, CartTable } from '@/schema/cart'
import { ProductTable } from '@/schema/product'
import { eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (
    request: NextRequest,
    context: { params: { cartId: string } }
) => {
    const { cartId } = context.params
    const { productId } = await request.json()

    if (productId == undefined) {
        return NextResponse.json(
            { error: { message: 'Bad Request', code: 'BAD_REQUEST' } },
            { status: 400 }
        )
    }

    try {
        // Get product
        const product = await db.query.ProductTable.findFirst({
            where: eq(ProductTable.id, productId),
        })

        if (product == undefined) {
            return NextResponse.json(
                {
                    error: {
                        message: 'Product not found',
                        code: 'NOT_FOUND',
                    },
                },
                { status: 404 }
            )
        }

        // Create cart line
        await db
            .insert(CartLineItemTable)
            .values({
                subtotal: product.price,
                total: product.price,
                productId: product.id,
                cartId: cartId,
            })
            .returning()
            .then(rows => rows[0])

        // Get updated cart
        const updatedCart = await db.query.CartTable.findMany({
            where: eq(CartTable.id, cartId),
            with: {
                lines: true,
            },
        }).then(carts => carts[0])

        return NextResponse.json(updatedCart)
    } catch (error) {
        return handleError(error as Error)
    }
}

export const DELETE = async (
    _: NextRequest,
    context: { params: { cartId: string } }
) => {
    const { cartId } = context.params

    try {
        // Delete cart line
        await db
            .delete(CartLineItemTable)
            .where(eq(CartLineItemTable.cartId, cartId))

        // Get updated cart
        const updatedCart = await db.query.CartTable.findMany({
            where: eq(CartTable.id, cartId),
            with: {
                lines: true,
            },
        }).then(rows => rows[0])

        return NextResponse.json(updatedCart)
    } catch (error) {
        return handleError(error as Error)
    }
}
