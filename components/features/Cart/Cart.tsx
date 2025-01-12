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
        <div className="flex">
            <div className="w-3/4">
                <CartLineList lines={cart!.lines} />
            </div>
            <div className="flex flex-col w-1/4">
                <CartSummary cart={cart!} />
            </div>
        </div>
    )
}
