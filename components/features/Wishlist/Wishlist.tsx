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
import { Skeleton } from '@/components/ui/Skeleton'

type WishlistProps = {
    pageSize: number
    orderBy: SortKey
    cols: number
}

const gridColsClasses: Record<number, string> = {
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
}

export const Wishlist: React.FC<WishlistProps> = ({
    pageSize,
    orderBy,
    cols,
}) => {
    const { data, error, isPending, hasNextPage, fetchNextPage } =
        useWishlistLines({
            size: pageSize,
            orderBy,
        })

    const { mutate: deleteWishlistLine } = useDeleteWishlistLine()

    if (error) {
        throw error
    }

    if (isPending) {
        return <Fallback />
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
                        {wishlist.length > 0 ? (
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
                                />{' '}
                            </Fragment>
                        ) : (
                            <p>Your wishlist is empty.</p>
                        )}
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

const Fallback = () => (
    <div className="grid grid-cols-4 gap-[1px] w-full bg-black">
        {Array(8)
            .fill('x')
            .map((_, idx) => (
                <div key={idx} className="h-[448px] bg-white">
                    <Skeleton className="w-full h-80 rounded-none border-b border-gray-400" />
                    <div className="w-full h-full px-6 pt-5 pb-5">
                        <Skeleton className="w-[160px] h-[24px] mb-4" />
                        <Skeleton className="w-[60px] h-[18px] mb-2" />
                        <Skeleton className="w-[90px] h-[18px]" />
                    </div>
                </div>
            ))}
    </div>
)
