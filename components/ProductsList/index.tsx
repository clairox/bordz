'use client'

import { Fragment } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ArrowClockwise } from '@phosphor-icons/react'

import { useCartQuery } from '@/context/CartContext'
import { useAddCartLineMutation, useDeleteWishlistLine } from '@/hooks'
import fetchAbsolute from '@/lib/fetchAbsolute'
import PriceRepr from '../PriceRepr'
import Link from 'next/link'
import useAddWishlistLine from '@/hooks/useAddWishlistLine'
import { useWishlist } from '@/context/WishlistContext'
import WishlistButton from '../WishlistButton'
import CartButton from '../CartButton'

const ProductsList: React.FC = () => {
    const {
        data: products,
        status: productsStatus,
        refetch,
    } = useQuery<Product[]>({
        queryKey: ['products'],
        queryFn: async () => {
            try {
                const res = await fetchAbsolute('/products?publicOnly=true')

                if (!res.ok) {
                    throw res
                }

                return await res.json()
            } catch (error) {
                throw error
            }
        },
    })

    const { data: cart } = useCartQuery()
    const { data: wishlist } = useWishlist()

    if (productsStatus === 'error') {
        return (
            <div>
                <p>There was a problem loading your cart</p>
                <button onClick={() => refetch()} className="flex">
                    <span>Retry</span>
                    <ArrowClockwise size={22} weight="light" />
                </button>
            </div>
        )
    }

    if (productsStatus === 'pending' || !products) {
        return <div>Loading...</div>
    }

    return (
        <div className="flex justify-between w-full">
            {products.map(product => {
                const cartLineId = cart?.lines.find(
                    line => line.productId === product.id
                )?.id

                const wishlistLineId = wishlist?.lines.find(
                    line => line.productId === product.id
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

    // const addToCartButton = useMemo(() => {
    //     const defaultButton = (
    //         <button onClick={() => addToCart(product.id)}>Add to Cart</button>
    //     )
    //
    //     if (isInCart && addToCartStatus === 'idle') {
    //         return <button disabled>Already in Cart</button>
    //     }
    //
    //     if (!product.availableForSale) {
    //         return <button disabled>Out of Stock</button>
    //     }
    //
    //     if (addToCartStatus === 'pending') {
    //         return <button disabled>Adding...</button>
    //     }
    //
    //     if (addToCartStatus === 'success') {
    //         return <button disabled>Added!</button>
    //     }
    //
    //     switch (cartStatus) {
    //         case 'error':
    //             return <button disabled>Add to Cart</button>
    //         case 'pending':
    //             return <button disabled>Loading...</button>
    //         case 'success':
    //             return defaultButton
    //         default:
    //             return defaultButton
    //     }
    // }, [cartStatus, addToCartStatus, addToCart, isInCart, product])

    return (
        <article className="flex flex-col gap-2">
            <h3>{product.title}</h3>
            {product.boardSetup != undefined && (
                <Fragment>
                    <ul className="text-sm">
                        <li className="line-clamp-1">
                            {product.boardSetup?.deck.title}
                        </li>
                        <li className="line-clamp-1">
                            {product.boardSetup?.trucks.title}
                        </li>
                        <li className="line-clamp-1">
                            {product.boardSetup?.wheels.title}
                        </li>
                        <li className="line-clamp-1">
                            {product.boardSetup?.bearings.title}
                        </li>
                        <li className="line-clamp-1">
                            {product.boardSetup?.hardware.title}
                        </li>
                        <li className="line-clamp-1">
                            {product.boardSetup?.griptape.title}
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
