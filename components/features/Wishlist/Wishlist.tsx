'use client'

import { Fragment } from 'react'
import Link from 'next/link'
import { Trash } from '@phosphor-icons/react'

import InfiniteItemList from '@/components/common/InfiniteItemList'
import StoredPreviewImage from '@/components/common/StoredPreviewImage'
import { useDeleteWishlistLine, useWishlistLines } from '@/hooks/data/wishlist'
import { ProductBoardPopover } from '../Products'
import PriceRepr from '@/components/common/PriceRepr'
import GridFiller from '@/components/common/GridFiller'

type WishlistProps = {
    pageSize: number
    orderBy: SortKey
    cols: number
}

export const Wishlist: React.FC<WishlistProps> = ({
    pageSize,
    orderBy,
    cols,
}) => {
    const { data, hasNextPage, fetchNextPage } = useWishlistLines({
        size: pageSize,
        orderBy,
    })

    const { mutate: deleteWishlistLine } = useDeleteWishlistLine()

    const gridColsClasses: Record<number, string> = {
        3: 'grid-cols-3',
        4: 'grid-cols-4',
        5: 'grid-cols-5',
        6: 'grid-cols-6',
    }

    return (
        <div
            className={`grid ${gridColsClasses[cols]} gap-[1px] w-full bg-black`}
        >
            <InfiniteItemList
                pages={data.pages}
                hasNextPage={hasNextPage}
                fetchNextPage={fetchNextPage}
                render={wishlist => (
                    <Fragment>
                        {wishlist.map(item => {
                            return (
                                <WishlistItemCard
                                    item={item}
                                    deleteItem={lineId =>
                                        deleteWishlistLine({ lineId })
                                    }
                                    key={item.id}
                                />
                            )
                        })}
                        <GridFiller
                            itemCount={wishlist.length}
                            gridTrackSize={cols}
                        />
                    </Fragment>
                )}
            />
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
        <article className="flex flex-col gap-2 bg-white">
            <div className="w-full h-80 border-b border-gray-400">
                <StoredPreviewImage
                    path={product.featuredImage}
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
