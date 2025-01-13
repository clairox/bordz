'use client'

import Link from 'next/link'

import StoredPreviewImage from '@/components/common/StoredPreviewImage'
import { useWishlist } from '@/context/WishlistContext'
import { useDeleteCartLineMutation } from '@/hooks/data/cart'
import {
    useAddWishlistLine,
    useDeleteWishlistLine,
} from '@/hooks/data/wishlist'
import { ProductBoardPopover } from '../Products'
import { AddToWishlistButton } from '../Wishlist'
import PriceRepr from '@/components/common/PriceRepr'

type CartLineListProps = {
    lines: CartLine[]
}

export const CartLineList: React.FC<CartLineListProps> = ({ lines }) => {
    const { data: wishlist } = useWishlist()
    const { mutateAsync: deleteCartLine } = useDeleteCartLineMutation()
    const { mutateAsync: addWishlistLine } = useAddWishlistLine()
    const { mutateAsync: deleteWishlistLine } = useDeleteWishlistLine()

    const handleDeleteCartLine = async (lineId: string) => {
        await deleteCartLine({ lineId })
    }
    const handleAddWishlistLine = async (productId: string) => {
        await addWishlistLine({ productId })
    }
    const handleDeleteWishlistLine = async (lineId: string) => {
        await deleteWishlistLine({ lineId })
    }

    if (!wishlist) {
        return <div>Loading...</div>
    }

    return (
        <div>
            {lines.length > 0 ? (
                <div className="flex flex-col gap-[1px] bg-black">
                    {lines.map(line => {
                        const wishlistLineId = wishlist?.lines.find(
                            wishlistLine =>
                                wishlistLine.product.id === line.product.id
                        )?.id
                        return (
                            <CartLineCard
                                cartLine={line}
                                deleteCartLine={handleDeleteCartLine}
                                addWishlistLine={handleAddWishlistLine}
                                deleteWishlistLine={handleDeleteWishlistLine}
                                wishlistLineId={wishlistLineId}
                                key={line.id}
                            />
                        )
                    })}
                </div>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    )
}

type CartLineCardProps = {
    cartLine: CartLine
    deleteCartLine: (id: string) => Promise<void>
    addWishlistLine: (productId: string) => Promise<void>
    deleteWishlistLine: (id: string) => Promise<void>
    wishlistLineId?: string
}

const CartLineCard: React.FC<CartLineCardProps> = ({
    cartLine,
    deleteCartLine,
    addWishlistLine,
    deleteWishlistLine,
    wishlistLineId,
}) => {
    const { product } = cartLine

    const handleDeleteButtonClick = () => {
        deleteCartLine(cartLine.id)
    }

    const moveToWishlist = async () => {
        await addWishlistLine(cartLine.product.id)
        deleteCartLine(cartLine.id)
    }

    const handleWishlistButtonToggle = () => {
        if (wishlistLineId) {
            deleteWishlistLine(wishlistLineId)
        } else {
            moveToWishlist()
        }
    }

    return (
        <article className="flex h-48 bg-white">
            <div className="w-52 border-r border-black">
                <StoredPreviewImage
                    path={product.board?.deck.images?.[0]}
                    alt="product image"
                />
            </div>
            <div className="w-full flex flex-col justify-between gap-4 px-6 pt-5 pb-4">
                <div className="flex flex-col items-start gap-1">
                    <div className="flex justify-between items-center w-full">
                        <div className="flex justify-start items-center gap-2">
                            <h1 className="text-lg">{product.title}</h1>
                            {product.board && (
                                <ProductBoardPopover board={product.board} />
                            )}
                        </div>
                        <AddToWishlistButton
                            isInWishlist={!!wishlistLineId}
                            onToggle={handleWishlistButtonToggle}
                        />
                    </div>
                    <Link
                        href={`/lab?mode=edit&id=${cartLine.id}`}
                        className="hover:underline"
                    >
                        Edit
                    </Link>
                </div>
                <div className="flex flex-col gap-4">
                    <p>
                        Qty:{' '}
                        <span className="font-semibold">
                            {cartLine.quantity}
                        </span>
                    </p>
                    <div className="flex justify-between">
                        <div>
                            <button
                                onClick={handleDeleteButtonClick}
                                className="hover:underline"
                            >
                                Delete
                            </button>
                        </div>
                        <div>
                            <p className="text-lg">
                                <PriceRepr value={cartLine.subtotal} />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    )
}
