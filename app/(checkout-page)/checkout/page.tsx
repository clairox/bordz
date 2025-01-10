'use client'

import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import { useCartQuery } from '@/context/CartContext'
import Checkout, {
    ProcessCheckoutCompletion,
} from '@/components/features/Checkout'
import RedirectIf from '@/components/common/RedirectIf'

const CheckoutPage = () => {
    const searchParams = useSearchParams()

    const { data: cart } = useCartQuery()

    const [client, setClient] = useState(false)
    const clientSecret = useMemo(
        () => searchParams.get('payment_intent_client_secret'),
        [searchParams]
    )

    useEffect(() => {
        if (window) {
            setClient(true)
        }
    }, [])

    if (!client || !cart) {
        return <div>Loading...</div>
    }

    const isCartEmpty = !clientSecret && cart.lines.length === 0

    return (
        <RedirectIf condition={isCartEmpty} url={'/cart'}>
            {clientSecret ? <ProcessCheckoutCompletion /> : <Checkout />}
        </RedirectIf>
    )
}

export default CheckoutPage
