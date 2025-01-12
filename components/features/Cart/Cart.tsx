'use client'

import { ArrowClockwise } from '@phosphor-icons/react'

import { useCartQuery } from '@/context/CartContext'
import { CartLineList } from './CartLineList'
import { CartSummary } from './CartSummary'
import { Button } from '@/components/ui/Button'

export const Cart: React.FC = () => {
    const { data: cart, error, isPending, refetch } = useCartQuery()

    if (error) {
        return (
            <div className="flex flex-col gap-3 justify-center items-center w-full h-[300px]">
                <p>There was a problem loading your cart.</p>
                <Button onClick={() => refetch()} className="flex">
                    <span>Retry</span>
                    <ArrowClockwise size={22} weight="light" />
                </Button>
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
            <div className="w-[450px] bg-white">
                <CartSummary cart={cart!} />
            </div>
        </div>
    )
}
