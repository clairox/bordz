'use client'

import Link from 'next/link'

import StoredPreviewImage from '@/components/common/StoredPreviewImage'
import { useDeleteCartLine } from '@/hooks/data/cart'
import { BoardDetailsPopover } from '../Products'
import { WishlistToggleButton } from '../Wishlist'
import PriceRepr from '@/components/common/PriceRepr'
import { useEffect, useState } from 'react'

type CartLineListProps = {
    lines: CartLine[]
}

export const CartLineList: React.FC<CartLineListProps> = ({ lines }) => {
    return (
        <div className="flex flex-col gap-[1px] bg-gray-400">
            {lines.map(line => {
                return <CartLineCard cartLine={line} key={line.id} />
            })}
        </div>
    )
}

type CartLineCardProps = {
    cartLine: CartLine
}

const CartLineCard: React.FC<CartLineCardProps> = ({ cartLine }) => {
    const { product } = cartLine
    const deleteCartLine = useDeleteCartLine()

    const [deleting, setDeleting] = useState(false)

    useEffect(() => {
        if (deleteCartLine.error) {
            setDeleting(false)
        }
    }, [deleteCartLine])

    const handleDelete = () => {
        setDeleting(true)
        deleteCartLine.mutate({ lineId: cartLine.id })
    }

    return (
        <article className="relative flex bg-white">
            {deleting && (
                <div className="z-40 absolute flex justify-center items-center w-full h-full bg-white bg-opacity-60">
                    Loading...
                </div>
            )}
            <div className="w-52 border-r border-gray-400">
                <StoredPreviewImage
                    path={product.featuredImage}
                    alt="product image"
                />
            </div>
            <div className="w-full flex flex-col justify-between gap-4 px-6 pt-5 pb-4">
                <div className="flex flex-col items-start gap-1">
                    <div className="flex justify-between items-center w-full">
                        <div className="flex justify-start items-center gap-2">
                            <h1 className="text-lg">{product.title}</h1>
                            {product.productType === 'BOARD' && (
                                <BoardDetailsPopover productId={product.id} />
                            )}
                        </div>
                        <WishlistToggleButton
                            productId={product.id}
                            onClick={() => setDeleting(true)}
                            onAddSuccess={() =>
                                deleteCartLine.mutate({ lineId: cartLine.id })
                            }
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
                                onClick={handleDelete}
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
