'use client'

import { ArrowClockwise } from '@phosphor-icons/react'

import { useCartQuery } from '@/context/CartContext'
import { CartLineList } from './CartLineList'
import { CartSummary } from './CartSummary'

export const Cart: React.FC = () => {
    const { data: cart, error, isPending, refetch } = useCartQuery()

    if (error) {
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

    if (isPending) {
        return <div>Loading...</div>
    }

    return (
        <div className="flex gap-[1px] bg-black">
            <div className="w-full bg-white">
                <CartLineList lines={cart!.lines} />
            </div>
            <div className="w-[400px] bg-white">
                <CartSummary cart={cart!} />
            </div>
        </div>
    )
}
