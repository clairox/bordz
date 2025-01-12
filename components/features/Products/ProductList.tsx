'use client'

import Link from 'next/link'

import { useCartQuery } from '@/context/CartContext'
import { useAddCartLineMutation } from '@/hooks/data/cart'
import {
    useAddWishlistLine,
    useDeleteWishlistLine,
} from '@/hooks/data/wishlist'
import { useWishlist } from '@/context/WishlistContext'
import PriceRepr from '@/components/common/PriceRepr'
import WishlistButton from '@/components/features/Wishlist/WishlistButton'
import { CartButton } from '@/components/features/Cart'
import { useProducts } from '@/hooks/data/product'
import InfiniteItemList from '@/components/common/InfiniteItemList'
import { ProductBoardPopover } from './ProductBoardPopover'
import StoredPreviewImage from '@/components/common/StoredPreviewImage'

type ProductListProps = {
    pageSize: number
    orderBy: SortKey
}

const ProductList: React.FC<ProductListProps> = ({ pageSize, orderBy }) => {
    const { data, hasNextPage, fetchNextPage } = useProducts({
        size: pageSize,
        orderBy,
    })

    const { data: cart } = useCartQuery()
    const { data: wishlist } = useWishlist()

    return (
        <InfiniteItemList
            pages={data.pages}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            render={products => {
                const productCount = products.length
                console.log(products[0])

                return (
                    <div className="grid grid-cols-4 gap-[1px] w-full bg-black">
                        {products.map(product => {
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
                                    key={product.id}
                                />
                            )
                        })}
                        <div
                            className={`${'col-span-' + (productCount % 4)} w-full h-full bg-white`}
                        />
                    </div>
                )
            }}
        />
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
            <div className="w-full h-80 border-b border-gray-400">
                <StoredPreviewImage
                    path={product.featuredImage}
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
                    <CartButton
                        isInCart={!!cartLineId}
                        addCartLineStatus={addCartLineStatus}
                        isInStock={product.availableForSale}
                        onClick={() => addCartLine({ productId: product.id })}
                    />
                    <WishlistButton
                        isInWishlist={!!wishlistLineId}
                        onToggle={handleWishlistButtonToggle}
                    />
                </div>
            </div>
        </article>
    )
}

export { ProductList }
