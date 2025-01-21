'use client'

import { HeartStraight } from '@phosphor-icons/react'

import {
    useAddWishlistLine,
    useDeleteWishlistLine,
} from '@/hooks/data/wishlist'
import { useEffect } from 'react'
import { useSessionWishlist } from '@/hooks/session'

type WishlistToggleButtonProps = {
    productId: string
    onClick?: () => void
    onAdd?: () => void
    onDelete?: () => void
    onAddSuccess?: () => void
    onDeleteSuccess?: () => void
}

export const WishlistToggleButton: React.FC<WishlistToggleButtonProps> = ({
    productId,
    onClick,
    onAdd,
    onDelete,
    onAddSuccess,
    onDeleteSuccess,
}) => {
    const wishlist = useSessionWishlist()
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
                onClick?.()

                if (existingLine) {
                    onDelete?.()
                    deleteWishlistItem.mutate({ lineId: existingLine.id })
                } else {
                    onAdd?.()
                    addWishlistItem.mutate({ productId })
                }
            }}
        >
            <HeartStraight size={26} weight={existingLine ? 'fill' : 'light'} />
        </button>
    )
}
