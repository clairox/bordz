'use client'

import { Fragment } from 'react'
import Link from 'next/link'

import { useCart } from '@/hooks/data/cart'
import { useAddCartLineMutation } from '@/hooks/data/cart'
import {
    useAddWishlistLine,
    useDeleteWishlistLine,
} from '@/hooks/data/wishlist'
import { useWishlist } from '@/context/WishlistContext'
import PriceRepr from '@/components/common/PriceRepr'
import { AddToWishlistButton } from '@/components/features/Wishlist'
import { AddToCartButton } from '@/components/features/Cart'
import { useProducts } from '@/hooks/data/product'
import InfiniteList from '@/components/common/InfiniteList'
import { ProductBoardPopover } from './ProductBoardPopover'
import StoredPreviewImage from '@/components/common/StoredPreviewImage'
import GridFiller from '@/components/common/GridFiller'
import { SortKey } from '@/types/sorting'

type ProductGridProps = {
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

export const ProductGrid: React.FC<ProductGridProps> = ({
    pageSize,
    orderBy,
    cols = 4,
}) => {
    const { data, hasNextPage, fetchNextPage } = useProducts({
        size: pageSize,
        orderBy,
    })

    const { data: cart } = useCart()
    const { data: wishlist } = useWishlist()

    return (
        <div
            className={`grid ${gridColsClasses[cols]} gap-[1px] w-full bg-black`}
        >
            <InfiniteList
                pages={data.pages}
                hasNextPage={hasNextPage}
                fetchNextPage={fetchNextPage}
                render={products => (
                    <Fragment>
                        {products.map((product, idx) => {
                            const cartLineId = cart?.lines.find(
                                line => line.product.id === product.id
                            )?.id

                            const wishlistLineId = wishlist?.lines.find(
                                line => line.product.id === product.id
                            )?.id

                            return (
                                <ProductCard
                                    product={product}
                                    cartLineId={cartLineId}
                                    wishlistLineId={wishlistLineId}
                                    key={product.id + idx}
                                />
                            )
                        })}
                        <GridFiller
                            itemCount={products.length}
                            gridTrackSize={cols}
                        />
                    </Fragment>
                )}
            />
        </div>
    )
}

type ProductCardProps = {
    product: Product
    cartLineId?: string
    wishlistLineId?: string
}

const ProductCard: React.FC<ProductCardProps> = ({
    product,
    cartLineId,
    wishlistLineId,
}) => {
    const { mutate: addCartLine, status: addCartLineStatus } =
        useAddCartLineMutation()

    const { mutate: addWishlistLine } = useAddWishlistLine()
    const { mutate: deleteWishlistLine } = useDeleteWishlistLine()

    const handleWishlistButtonToggle = () => {
        if (wishlistLineId) {
            deleteWishlistLine({ lineId: wishlistLineId })
        } else {
            addWishlistLine({ productId: product.id })
        }
    }

    return (
        <article className="flex flex-col gap-2 bg-white">
            <div className="border-b border-gray-400">
                <StoredPreviewImage
                    path={product.board?.deck.images?.[0]}
                    alt="product image"
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
                            href={`/lab?mode=customize&id=${product.id}`}
                            className="text-sm hover:underline"
                        >
                            Customize
                        </Link>
                    )}
                </div>
                <div className="flex justify-between">
                    <AddToCartButton
                        isInCart={!!cartLineId}
                        addCartLineStatus={addCartLineStatus}
                        isInStock={product.availableForSale}
                        onClick={() => addCartLine({ productId: product.id })}
                    />
                    <AddToWishlistButton
                        isInWishlist={!!wishlistLineId}
                        onToggle={handleWishlistButtonToggle}
                    />
                </div>
            </div>
        </article>
    )
}
