'use client'
import fetchAbsolute from '@/lib/fetchAbsolute'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { usePaymentIntentQuery, useUpdateCheckout } from '@/hooks'
import CheckoutView from './CheckoutView'
import { Elements } from '@stripe/react-stripe-js'
import stripe from '@/lib/stripe/client'
import { Appearance } from '@stripe/stripe-js'

const Checkout = () => {
    const queryKey = ['checkout']

    const { data: checkout } = useSuspenseQuery<Checkout>({
        queryKey,
        queryFn: async () => {
            try {
                const res = await fetchAbsolute(`/checkout`)

                if (!res.ok) {
                    throw res
                }

                return await res.json()
            } catch (error) {
                throw error
            }
        },
    })

    const { data: paymentIntent } = usePaymentIntentQuery(checkout)
    const clientSecret = paymentIntent.client_secret

    const { mutateAsync: updateCheckout } = useUpdateCheckout()

    useEffect(() => {
        if (!checkout.paymentIntentId) {
            updateCheckout({ paymentIntentId: paymentIntent.id })
        }
    }, [checkout, paymentIntent, updateCheckout])

    if (!clientSecret) {
        throw new Error('clientSecret is not defined')
    }

    const appearance = {
        theme: 'stripe' as Appearance['theme'],
    }

    const options = {
        clientSecret,
        appearance,
    }

    return (
        <div>
            {clientSecret && (
                <Elements options={options} stripe={stripe}>
                    <CheckoutView checkout={checkout} />
                </Elements>
            )}
        </div>
    )
}

export default Checkout
