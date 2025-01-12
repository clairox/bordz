'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowClockwise, Trash, X } from '@phosphor-icons/react'

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
import StoredPreviewImage from '@/components/common/StoredPreviewImage'
import { ProductBoardPopover } from '../Products'

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
        <div className="flex flex-col gap-[1px] bg-black">
            {lines?.length ? (
                lines.map(line => (
                    <CartLineCard
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

type CartLineCardProps = {
    cartLine: CartLine
    deleteCartLine: ({ lineId }: { lineId: string }) => void
    wishlistLineId?: string
}

const CartLineCard: React.FC<CartLineCardProps> = ({
    cartLine,
    deleteCartLine,
    wishlistLineId,
}) => {
    const { product } = cartLine
    const { board } = product

    const { mutateAsync: addWishlistLine } = useAddWishlistLine()
    const { mutateAsync: deleteWishlistLine } = useDeleteWishlistLine()

    const handleDeleteButtonClick = () => {
        deleteCartLine({ lineId: cartLine.id })
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
        <article className="flex h-48 bg-white">
            <div className="w-52 border-r border-black">
                <StoredPreviewImage
                    path={product.featuredImage}
                    alt="product image"
                />
            </div>
            <div className="w-full flex flex-col justify-between gap-4 px-6 pt-5 pb-4">
                <div className="flex flex-col items-start gap-1">
                    <div className="flex justify-between items-center w-full">
                        <div className="flex justify-start items-center gap-2">
                            <h1 className="text-lg">{product.title}</h1>
                            {product.board && (
                                <ProductBoardPopover board={product.board} />
                            )}
                        </div>
                        <WishlistButton
                            isInWishlist={!!wishlistLineId}
                            onToggle={handleWishlistButtonToggle}
                        />
                    </div>
                    <Link
                        href={`/lab?mode=edit&id=${cartLine.id}`}
                        className="hover:underline"
                    >
                        Edit
                    </Link>
                </div>
                <div className="flex flex-col gap-4">
                    <p>
                        Qty:{' '}
                        <span className="font-semibold">
                            {cartLine.quantity}
                        </span>
                    </p>
                    <div className="flex justify-between">
                        <div>
                            <button
                                onClick={handleDeleteButtonClick}
                                className="hover:underline"
                            >
                                Delete
                            </button>
                        </div>
                        <div>
                            <p className="text-lg">
                                <PriceRepr value={cartLine.subtotal} />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default Cart
export * from './CartButton'
