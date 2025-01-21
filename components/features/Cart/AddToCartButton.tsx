'use client'

import { useMemo } from 'react'

import { useAddCartLine, useCart } from '@/hooks/data/cart'

type AddToCartButtonProps = {
    productId: string
    isInStock: boolean
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
    productId,
    isInStock,
}) => {
    const cart = useCart()
    const addCartLine = useAddCartLine()

    const existingLine = cart.data?.lines.find(
        line => line.product.id === productId
    )

    const content = useMemo(() => {
        if (cart.isPending) {
            return 'Loading'
        }

        if (!isInStock) {
            return 'Out of stock'
        } else if (addCartLine.isIdle && existingLine) {
            return 'Already in cart'
        } else if (addCartLine.isIdle) {
            return 'Add to cart'
        } else if (addCartLine.isPending) {
            return 'Loading...'
        } else if (addCartLine.isSuccess) {
            return 'Added!'
        }
    }, [addCartLine, isInStock, existingLine, cart.isPending])

    const disabled =
        addCartLine.isPending || addCartLine.isSuccess || !!existingLine

    return (
        <button
            disabled={disabled}
            onClick={() => addCartLine.mutate({ productId })}
        >
            {content}
        </button>
    )
}
