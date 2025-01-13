'use client'

import { useMemo } from 'react'
import { MutationStatus } from '@tanstack/react-query'

type AddToCartButtonProps = {
    isInCart: boolean
    addCartLineStatus: MutationStatus
    isInStock: boolean
    onClick: () => void
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
    isInCart,
    addCartLineStatus,
    isInStock,
    onClick,
}) => {
    const content = useMemo(() => {
        if (!isInStock) {
            return 'Out of stock'
        }

        if (addCartLineStatus === 'pending') {
            return 'Loading...'
        }

        if (addCartLineStatus === 'success') {
            return 'Added!'
        }

        if (addCartLineStatus === 'idle' && isInCart) {
            return 'Already in cart'
        } else if (addCartLineStatus === 'idle') {
            return 'Add to cart'
        }
    }, [isInStock, addCartLineStatus, isInCart])

    const handleClick = () => {
        onClick()
    }

    return (
        <button
            disabled={
                addCartLineStatus === 'pending' ||
                addCartLineStatus === 'success' ||
                isInCart
            }
            onClick={handleClick}
        >
            {content}
        </button>
    )
}

export { AddToCartButton }
