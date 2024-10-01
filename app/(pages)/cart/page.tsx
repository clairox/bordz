'use client'
import { useCart } from '@/app/providers/Cart'
import { Trash } from '@phosphor-icons/react'
import Image from 'next/image'

const Cart: React.FC = () => {
    const { cart } = useCart()

    const handleCheckoutButtonClick = () => {
        console.log('handleCheckoutButtonClick')
    }

    return (
        <section className="flex flex-col">
            <h1>Cart</h1>
            <div className="flex">
                <div className="flex flex-col w-3/4">
                    {cart.lines.length ? (
                        cart.lines.map(line => (
                            <CartLine cartLine={line} key={line.id} />
                        ))
                    ) : (
                        <p>Cart Empty</p>
                    )}
                </div>
                <div className="flex flex-col w-1/4">
                    <div className="flex flex-col">
                        <div className="flex justify-between">
                            <div>Subtotal:</div>
                            <div>${cart.cost.subtotalAmount.amount}</div>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button onClick={handleCheckoutButtonClick}>
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

type CartLineProps = {
    cartLine: CartLine
}

const CartLine: React.FC<CartLineProps> = ({ cartLine }) => {
    const { product } = cartLine

    return (
        <article className="flex gap-2">
            <Image
                src={product.featuredImage.src}
                alt={product.featuredImage.alt}
                width={product.featuredImage.width}
                height={product.featuredImage.height}
            />
            <div className="flex flex-col">
                <div className="flex justify-between">
                    <ul className="line-clamp-1">
                        <li>{product.parts.deck.title}</li>
                        <li>{product.parts.trucks.title}</li>
                        <li>{product.parts.wheels.title}</li>
                        <li>{product.parts.bearings.title}</li>
                        <li>{product.parts.hardware.title}</li>
                        <li>{product.parts.griptape.title}</li>
                    </ul>
                    <div>
                        <button>
                            <Trash size={28} weight="light" />
                        </button>
                    </div>
                </div>
                <div className="flex justify-end">
                    <div>
                        <p>${cartLine.cost.subtotalAmount.amount}</p>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default Cart
