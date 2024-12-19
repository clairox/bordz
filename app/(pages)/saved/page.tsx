'use client'

import { Trash } from '@phosphor-icons/react'
import { useDeleteWishlistLine } from '@/hooks'
import Link from 'next/link'
import PriceRepr from '@/components/PriceRepr'
import Image from 'next/image'
import { useAddCartLineMutation } from '@/hooks'
import { useWishlist } from '@/context/WishlistContext'

const SavedItemsPage = () => {
    const { data: wishlist, error, status } = useWishlist()

    if (error) {
        throw error
    }

    if (status === 'pending') {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1>Saved Items</h1>
            <Wishlist wishlist={wishlist} />
        </div>
    )
}

type WishlistProps = {
    wishlist: Wishlist
}

const Wishlist: React.FC<WishlistProps> = ({ wishlist }) => {
    const lines = wishlist.lines
    const { mutate: deleteWishlistLine } = useDeleteWishlistLine()

    const handleDeleteWishlistLine = (id: string) =>
        deleteWishlistLine({ lineId: id })

    return (
        <div className="flex flex-col">
            {lines?.length ? (
                lines.map(line => (
                    <WishlistLineItem
                        wishlistLine={line}
                        deleteWishlistLine={handleDeleteWishlistLine}
                        key={line.id}
                    />
                ))
            ) : (
                <p>No saved items</p>
            )}
        </div>
    )
}

type WishlistLineItemProps = {
    wishlistLine: WishlistLine
    deleteWishlistLine: (lineId: string) => void
}

const WishlistLineItem: React.FC<WishlistLineItemProps> = ({
    wishlistLine,
    deleteWishlistLine,
}) => {
    const { product } = wishlistLine
    const { boardSetup } = product

    const handleDeleteButtonClick = () => {
        const { id } = wishlistLine
        deleteWishlistLine(id)
    }

    return (
        <article className="flex gap-2">
            {product.featuredImage && (
                <Image
                    src={product.featuredImage.src}
                    alt={product.featuredImage.alt}
                    width={product.featuredImage.width}
                    height={product.featuredImage.height}
                />
            )}
            <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                    <h1>{product.title}</h1>

                    <div>
                        <button onClick={handleDeleteButtonClick}>
                            <Trash size={28} weight="light" />
                        </button>
                    </div>
                </div>
                <ul className="text-sm">
                    <li className="line-clamp-1">{boardSetup?.deck.title}</li>
                    <li className="line-clamp-1">{boardSetup?.trucks.title}</li>
                    <li className="line-clamp-1">{boardSetup?.wheels.title}</li>
                    <li className="line-clamp-1">
                        {boardSetup?.bearings.title}
                    </li>
                    <li className="line-clamp-1">
                        {boardSetup?.hardware.title}
                    </li>
                    <li className="line-clamp-1">
                        {boardSetup?.griptape.title}
                    </li>
                </ul>
                <div className="flex justify-between">
                    {/* TODO: Add wishlist item editing to edit mode */}
                    <div>
                        <Link
                            href={`/lab?mode=edit&id=${wishlistLine.id}`}
                            className="hover:underline"
                        >
                            Edit
                        </Link>
                    </div>
                    <div>
                        <p>
                            <PriceRepr value={wishlistLine.product.price} />
                        </p>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default SavedItemsPage
