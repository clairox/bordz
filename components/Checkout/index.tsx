'use client'

import { useEffect } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { Appearance } from '@stripe/stripe-js'

import { useCheckout, usePaymentIntentQuery, useUpdateCheckout } from '@/hooks'
import stripe from '@/lib/stripe/client'
import CheckoutForm from './CheckoutForm'
import CheckoutSummary from './CheckoutSummary'

const Checkout = () => {
    const { data: checkout } = useCheckout()

    const { data: paymentIntent } = usePaymentIntentQuery(checkout)
    const clientSecret = paymentIntent.client_secret

    const { mutateAsync: updateCheckout } = useUpdateCheckout()

    useEffect(() => {
        if (!checkout.paymentIntentId) {
            updateCheckout({ paymentIntentId: paymentIntent.id })
        }
    }, [checkout, paymentIntent, updateCheckout])

    if (!clientSecret) {
        throw new Error('clientSecret is not defined.')
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
                    <div className="mx-auto px-8 max-w-[1000px]">
                        <h1 className="mb-5 font-semibold text-3xl">
                            Checkout
                        </h1>
                        <div className="grid grid-cols-12 gap-8 w-full">
                            <div className="col-span-7">
                                <CheckoutForm />
                            </div>
                            <div className="col-span-5">
                                <CheckoutSummary checkout={checkout} />
                            </div>
                        </div>
                    </div>
                </Elements>
            )}
        </div>
    )
}

export default Checkout
