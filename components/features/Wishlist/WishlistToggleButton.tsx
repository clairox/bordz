'use client'

import { HeartStraight } from '@phosphor-icons/react'

import {
    useAddWishlistLine,
    useDeleteWishlistLine,
} from '@/hooks/data/wishlist'
import { useWishlist } from '@/context/WishlistContext'
import { useEffect } from 'react'

type WishlistToggleButtonProps = {
    productId: string
    onToggle?: () => void
    onAddSuccess?: () => void
    onDeleteSuccess?: () => void
}

const WishlistToggleButton: React.FC<WishlistToggleButtonProps> = ({
    productId,
    onToggle,
    onAddSuccess,
    onDeleteSuccess,
}) => {
    const wishlist = useWishlist()
    const addWishlistItem = useAddWishlistLine()
    const deleteWishlistItem = useDeleteWishlistLine()

    useEffect(() => {
        if (onAddSuccess && addWishlistItem.isSuccess) {
            onAddSuccess()
            addWishlistItem.reset()
        }
    }, [addWishlistItem, onAddSuccess])

    useEffect(() => {
        if (onDeleteSuccess && deleteWishlistItem.isSuccess) {
            onDeleteSuccess()
            deleteWishlistItem.reset()
        }
    }, [deleteWishlistItem, onDeleteSuccess])

    if (wishlist.error) {
        throw wishlist.error
    }

    if (wishlist.isPending) {
        return <div>...</div>
    }

    const existingLine = wishlist.data!.lines.find(
        line => line.product.id === productId
    )

    return (
        <button
            disabled={addWishlistItem.isPending || deleteWishlistItem.isPending}
            onClick={() => {
                onToggle?.()

                if (existingLine) {
                    deleteWishlistItem.mutate({ lineId: existingLine.id })
                } else {
                    addWishlistItem.mutate({ productId })
                }
            }}
        >
            <HeartStraight size={26} weight={existingLine ? 'fill' : 'light'} />
        </button>
    )
}

export { WishlistToggleButton }
