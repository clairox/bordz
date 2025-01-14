'use client'

import Link from 'next/link'
import { Trash } from '@phosphor-icons/react'

import StoredPreviewImage from '@/components/common/StoredPreviewImage'
import { useDeleteWishlistLine } from '@/hooks/data/wishlist'
import { ProductBoardPopover } from '../Products'
import PriceRepr from '@/components/common/PriceRepr'
import GridFiller from '@/components/common/GridFiller'

type WishlistGridProps = {
    items: WishlistLine[]
    columnCount: number
}

const gridColsClasses: Record<number, string> = {
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
}

export const WishlistGrid: React.FC<WishlistGridProps> = ({
    items,
    columnCount,
}) => {
    const { mutate: deleteWishlistLine } = useDeleteWishlistLine()

    if (items.length === 0) {
        return (
            <div className="flex justify-center items-center w-full h-[300px]">
                <p>Your wishlist is empty.</p>
            </div>
        )
    }

    return (
        <div
            className={`grid ${gridColsClasses[columnCount]} gap-[1px] w-full bg-black`}
        >
            {items.map(item => {
                return (
                    <WishlistItemCard
                        item={item}
                        deleteItem={lineId => deleteWishlistLine({ lineId })}
                        key={item.id}
                    />
                )
            })}
            <GridFiller itemCount={items.length} gridTrackSize={columnCount} />
        </div>
    )
}

type WishlistItemCardProps = {
    item: WishlistLine
    deleteItem: (lineId: string) => void
}

const WishlistItemCard: React.FC<WishlistItemCardProps> = ({
    item,
    deleteItem,
}) => {
    const { product } = item

    return (
        <article className="col-span-1 flex flex-col gap-2 bg-white">
            <div className="border-b border-gray-400">
                <StoredPreviewImage
                    path={product.board?.deck.images?.[0]}
                    alt="wishlist item image"
                />
            </div>
            <div className="px-6 pt-2 pb-5">
                <div className="flex justify-between mb-4">
                    <h3>{product.title}</h3>
                    {product.board && (
                        <ProductBoardPopover board={product.board} />
                    )}
                </div>
                <div className="flex justify-between">
                    <p>
                        <PriceRepr value={product.price} />
                    </p>
                    {product.board && (
                        <Link
                            href={`/lab?mode=edit&id=${item.id}`}
                            className="text-sm hover:underline"
                        >
                            Edit
                        </Link>
                    )}
                </div>
                <div className="flex justify-end">
                    <button onClick={() => deleteItem(item.id)}>
                        <Trash size={28} weight="light" />
                    </button>
                </div>
            </div>
        </article>
    )
}
