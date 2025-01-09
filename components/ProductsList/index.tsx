'use client'

import { Fragment } from 'react'
import Link from 'next/link'

import { useCartQuery } from '@/context/CartContext'
import { useAddCartLineMutation, useDeleteWishlistLine } from '@/hooks'
import PriceRepr from '../PriceRepr'
import useAddWishlistLine from '@/hooks/useAddWishlistLine'
import { useWishlist } from '@/context/WishlistContext'
import WishlistButton from '../WishlistButton'
import CartButton from '../CartButton'

type ProductsListProps = {
    products: Product[]
}

const ProductsList: React.FC<ProductsListProps> = ({ products }) => {
    const { data: cart } = useCartQuery()
    const { data: wishlist } = useWishlist()

    return (
        <div className="grid grid-cols-4 gap-[1px] w-full border-b border-black">
            {products.map(product => {
                const cartLineId = cart?.lines.find(
                    line => line.product.id === product.id
                )?.id

                const wishlistLineId = wishlist?.lines.find(
                    line => line.product.id === product.id
                )?.id

                return (
                    <ProductsListItem
                        product={product}
                        cartLineId={cartLineId}
                        wishlistLineId={wishlistLineId}
                        key={product.id}
                    />
                )
            })}
        </div>
    )
}

type ProductsListItemProps = {
    product: Product
    cartLineId?: string
    wishlistLineId?: string
}

const ProductsListItem: React.FC<ProductsListItemProps> = ({
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
        <article className="flex flex-col gap-2 p-6 border-r border-black last:border-none">
            <h3>{product.title}</h3>
            {product.board != undefined && (
                <Fragment>
                    <ul className="text-sm">
                        <li className="line-clamp-1">
                            {product.board?.deck.title}
                        </li>
                        <li className="line-clamp-1">
                            {product.board?.trucks.title}
                        </li>
                        <li className="line-clamp-1">
                            {product.board?.wheels.title}
                        </li>
                        <li className="line-clamp-1">
                            {product.board?.bearings.title}
                        </li>
                        <li className="line-clamp-1">
                            {product.board?.hardware.title}
                        </li>
                        <li className="line-clamp-1">
                            {product.board?.griptape.title}
                        </li>
                    </ul>
                    <Link
                        href={`/lab?mode=customize&id=${product.id}`}
                        className="hover:underline"
                    >
                        Customize
                    </Link>
                </Fragment>
            )}
            <p>
                <PriceRepr value={product.price} />
            </p>
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
        </article>
    )
}

export default ProductsList
