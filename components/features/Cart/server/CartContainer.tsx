// 'use client'

// import { ArrowClockwise } from '@phosphor-icons/react'

// import { useCart } from '@/hooks/data/cart'
import { CartLineList } from '../CartLineList'
import { CartSummary } from '../CartSummary'
// import { Button } from '@/components/ui/Button'
import { Fragment } from 'react'
// import { db } from '@/drizzle/db'
// import { eq } from 'drizzle-orm'
// import { CartTable } from '@/drizzle/schema/cart'
import { getCart } from '@/app/api/shared'
import { mapCartResponseToCart } from '@/utils/conversions'

export const CartContainer: React.FC = async () => {
    const cartRecord = await getCart('053fb9eb-1231-4f3b-a625-1d78eb74f085')
    if (!cartRecord) {
        return (
            <div className="flex flex-col gap-3 justify-center items-center w-full h-[300px]">
                <p>There was a problem loading your cart.</p>
                {/* <Button onClick={() => refetch()} className="flex"> */}
                {/*     <span>Retry</span> */}
                {/*     <ArrowClockwise size={22} weight="light" /> */}
                {/* </Button> */}
            </div>
        )
    }
    const cart = mapCartResponseToCart(cartRecord)

    // const { data: cart, error, isPending, refetch } = useCart()
    //
    // if (error) {
    //     return (
    //         <div className="flex flex-col gap-3 justify-center items-center w-full h-[300px]">
    //             <p>There was a problem loading your cart.</p>
    //             <Button onClick={() => refetch()} className="flex">
    //                 <span>Retry</span>
    //                 <ArrowClockwise size={22} weight="light" />
    //             </Button>
    //         </div>
    //     )
    // }
    //
    // if (isPending) {
    //     return <Fallback />
    // }

    return (
        <Fragment>
            {cart!.lines.length > 0 ? (
                <div className="flex gap-[1px] bg-black">
                    <div className="w-full bg-white">
                        <CartLineList lines={cart!.lines} />
                    </div>
                    <div className="w-[450px] bg-white">
                        <CartSummary cart={cart!} />
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center w-full h-[300px]">
                    <p>Your cart is empty.</p>
                </div>
            )}
        </Fragment>
    )
}

// const Fallback = () => {
//     return <div>Loading...</div>
// }
