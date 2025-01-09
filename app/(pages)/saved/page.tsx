'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Trash } from '@phosphor-icons/react'

import { useDeleteWishlistLine, useWishlistLines } from '@/hooks'
import PriceRepr from '@/components/PriceRepr'
import SortSelect from '@/components/SortSelect'
import InfiniteItemList from '@/components/InfiniteItemList'

const SavedItemsPage = () => {
    const searchParams = useSearchParams()
    const page = Number(searchParams.get('page')) || 1
    const pageSize = Number(searchParams.get('size')) || 40
    const orderBy = (searchParams.get('orderBy') as SortKey) || undefined

    const { data, status, hasNextPage, fetchNextPage } = useWishlistLines({
        page,
        size: pageSize,
        orderBy,
    })

    if (status === 'error') {
        return <div>Error</div>
    }

    if (status === 'pending') {
        return <div>Loading...</div>
    }

    return (
        <div>
            <div className="pl-4 py-4 w-full border-b border-black">
                <h1>Saved Items</h1>
                <div className="flex">
                    <label htmlFor="sortSelect">Sort by</label>
                    <SortSelect
                        value={orderBy}
                        availableOptions={['date-desc', 'date-asc']}
                    />
                </div>
            </div>
            <InfiniteItemList
                pages={data.pages}
                hasNextPage={hasNextPage}
                fetchNextPage={fetchNextPage}
                render={items => <Wishlist items={items} />}
            />
        </div>
    )
}

type WishlistProps = {
    items: WishlistLine[]
}

const Wishlist: React.FC<WishlistProps> = ({ items }) => {
    const { mutate: deleteWishlistLine } = useDeleteWishlistLine()

    const handleDeleteWishlistLine = (id: string) =>
        deleteWishlistLine({ lineId: id })

    return (
        <div className="grid grid-cols-4 gap-[1px] w-full border-b border-black">
            {items?.length ? (
                items.map(item => (
                    <WishlistLineItem
                        wishlistLine={item}
                        deleteWishlistLine={handleDeleteWishlistLine}
                        key={item.id}
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
    const { board } = product

    const handleDeleteButtonClick = () => {
        const { id } = wishlistLine
        deleteWishlistLine(id)
    }

    return (
        <article className="flex flex-col gap-2 p-6 border-r border-black last:border-none">
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
                    <li className="line-clamp-1">{board?.deck.title}</li>
                    <li className="line-clamp-1">{board?.trucks.title}</li>
                    <li className="line-clamp-1">{board?.wheels.title}</li>
                    <li className="line-clamp-1">{board?.bearings.title}</li>
                    <li className="line-clamp-1">{board?.hardware.title}</li>
                    <li className="line-clamp-1">{board?.griptape.title}</li>
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
