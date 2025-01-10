'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowClockwise, Trash } from '@phosphor-icons/react'

import { useDeleteCartLineMutation } from '@/hooks/data/cart'
import {
    useAddWishlistLine,
    useDeleteWishlistLine,
} from '@/hooks/data/wishlist'
import { useCartQuery } from '@/context/CartContext'
import PriceRepr from '../../common/PriceRepr'
import { useCustomer } from '@/context/CustomerContext'
import WishlistButton from '../Wishlist/WishlistButton'
import { useWishlist } from '@/context/WishlistContext'

const Cart: React.FC = () => {
    const { data: cart, status, refetch } = useCartQuery()
    const { data: customer } = useCustomer()

    const router = useRouter()

    if (status === 'error') {
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

    if (status === 'pending' || !cart) {
        return <div>Loading...</div>
    }

    return (
        <section className="flex flex-col">
            <h1>Cart</h1>
            <div className="flex">
                <div className="w-3/4">
                    <CartLinesList lines={cart.lines} />
                </div>
                <div className="flex flex-col w-1/4">
                    <div className="flex flex-col">
                        <div className="flex flex-col">
                            <div className="flex justify-between">
                                <div>Subtotal:</div>
                                <div>
                                    <PriceRepr value={cart.subtotal} />
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <div>Estimated total:</div>
                                <div>
                                    <PriceRepr value={cart.total} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            disabled={!cart.lines || cart.lines.length === 0}
                            onClick={() =>
                                router.push(
                                    customer ? '/checkout' : '/start-checkout'
                                )
                            }
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

type CartLinesListProps = {
    lines: CartLine[] | undefined
}

const CartLinesList: React.FC<CartLinesListProps> = ({ lines }) => {
    const { data: wishlist } = useWishlist()
    const { mutate: deleteCartLine } = useDeleteCartLineMutation()

    if (!wishlist) {
        return <div>Loading...</div>
    }

    return (
        <div className="flex flex-col">
            {lines?.length ? (
                lines.map(line => (
                    <CartLinesListItem
                        cartLine={line}
                        deleteCartLine={deleteCartLine}
                        wishlistLineId={
                            wishlist?.lines.find(
                                wishlistLine =>
                                    wishlistLine.product.id === line.product.id
                            )?.id
                        }
                        key={line.id}
                    />
                ))
            ) : (
                <p>Cart Empty</p>
            )}
        </div>
    )
}

type CartLinesListItemProps = {
    cartLine: CartLine
    deleteCartLine: ({ lineId }: { lineId: string }) => void
    wishlistLineId?: string
}

const CartLinesListItem: React.FC<CartLinesListItemProps> = ({
    cartLine,
    deleteCartLine,
    wishlistLineId,
}) => {
    const { product } = cartLine
    const { board } = product

    const { mutateAsync: addWishlistLine } = useAddWishlistLine()
    const { mutateAsync: deleteWishlistLine } = useDeleteWishlistLine()

    const handleDeleteButtonClick = () => {
        const { id } = cartLine
        deleteCartLine({ lineId: id })
    }

    const moveToWishlist = async () => {
        await addWishlistLine({ productId: cartLine.product.id })
        deleteCartLine({ lineId: cartLine.id })
    }

    const handleWishlistButtonToggle = () => {
        if (wishlistLineId) {
            deleteWishlistLine({ lineId: wishlistLineId })
        } else {
            moveToWishlist()
        }
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
                        <WishlistButton
                            isInWishlist={!!wishlistLineId}
                            onToggle={handleWishlistButtonToggle}
                        />
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
                    <p>Qty: {cartLine.quantity}</p>
                    <div>
                        <Link
                            href={`/lab?mode=edit&id=${cartLine.id}`}
                            className="hover:underline"
                        >
                            Edit
                        </Link>
                    </div>
                    <div>
                        <p>
                            <PriceRepr value={cartLine.subtotal} />
                        </p>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default Cart
export * from './CartButton'
