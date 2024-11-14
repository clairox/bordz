'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowClockwise, HeartStraight, Trash } from '@phosphor-icons/react'

import { useDeleteCartLineMutation } from '@/hooks'
import { useCartQuery } from '@/context/cartContext'
import PriceRepr from '../PriceRepr'
import { useAuthQuery } from '@/context/authContext'

const Cart: React.FC = () => {
    const { data: cart, status, refetch } = useCartQuery()
    const {
        customer: { data: customer },
    } = useAuthQuery()

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
    const { mutate: deleteCartLine } = useDeleteCartLineMutation()

    return (
        <div className="flex flex-col">
            {lines?.length ? (
                lines.map(line => (
                    <CartLinesListItem
                        cartLine={line}
                        deleteCartLine={deleteCartLine}
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
}

const CartLinesListItem: React.FC<CartLinesListItemProps> = ({
    cartLine,
    deleteCartLine,
}) => {
    const { product } = cartLine

    const handleDeleteButtonClick = () => {
        const { id } = cartLine
        deleteCartLine({ lineId: id })
    }

    // TODO: Move cart item to wishlist
    const handleWishlistButtonClick = () => {
        console.log('handleWishlistButtonClick()')
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
            <div className="flex flex-col">
                <div className="flex justify-between">
                    <h1>{product.title}</h1>
                    {/* <ul className="line-clamp-1"> */}
                    {/*     <li>{product.parts.deck.title}</li> */}
                    {/*     <li>{product.parts.trucks.title}</li> */}
                    {/*     <li>{product.parts.wheels.title}</li> */}
                    {/*     <li>{product.parts.bearings.title}</li> */}
                    {/*     <li>{product.parts.hardware.title}</li> */}
                    {/*     <li>{product.parts.griptape.title}</li> */}
                    {/* </ul> */}
                    <div>
                        <button onClick={handleDeleteButtonClick}>
                            <Trash size={28} weight="light" />
                        </button>
                        <button onClick={handleWishlistButtonClick}>
                            <HeartStraight size={28} weight="light" />
                        </button>
                    </div>
                </div>
                <div className="flex justify-between">
                    <p>Qty: {cartLine.quantity}</p>
                    <div>
                        {/* TODO: Link to builder */}
                        <Link href="#" className="hover:underline">
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
