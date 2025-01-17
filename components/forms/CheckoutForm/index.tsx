import { FormEvent, useEffect, useState } from 'react'
import {
    AddressElement,
    PaymentElement,
    useElements,
    useStripe,
} from '@stripe/react-stripe-js'

import { useCreateAddress } from '@/hooks/data/address'
import { useUpdateCheckout } from '@/hooks/data/checkout'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { ContactOption } from '@stripe/stripe-js'
import { useCustomer } from '@/context/CustomerContext'

const CheckoutForm = () => {
    const stripe = useStripe()
    const elements = useElements()

    const router = useRouter()

    const [message, setMessage] = useState<string | null>(null)
    const [submitting, setSubmitting] = useState(false)
    const [email, setEmail] = useState('')

    const { data: auth } = useAuth()
    const { data: customer, status: customerStatus } = useCustomer()

    const { mutateAsync: updateCheckout } = useUpdateCheckout()
    const { mutateAsync: createAddress } = useCreateAddress()

    useEffect(() => {
        if (email || (auth && customerStatus === 'pending')) {
            return
        }

        if (auth) {
            setEmail(auth.email)
        } else {
            const emailRegex =
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            const sessionEmail = sessionStorage.getItem('email')
            if (!sessionEmail || !emailRegex.test(sessionEmail)) {
                sessionStorage.removeItem('email')
                router.push('/start-checkout')
            } else {
                sessionStorage.removeItem('email')
                setEmail(sessionEmail)
            }
        }
    }, [router, email, auth, customerStatus])

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!stripe || !elements) {
            return
        }

        setSubmitting(true)

        const addressElementValues = await elements
            .getElement('address')
            .getValue()
            .then(result => result)

        if (addressElementValues.complete) {
            const { name, address } = addressElementValues.value

            try {
                const existingAddress = customer?.addresses.find(_address => {
                    return (
                        _address.fullName === name &&
                        _address.line1 === address.line1 &&
                        _address.line2 == address.line2 &&
                        _address.city === address.city &&
                        _address.state === address.state &&
                        _address.countryCode === address.country &&
                        _address.postalCode === address.postal_code
                    )
                })

                if (existingAddress) {
                    await updateCheckout({
                        email,
                        shippingAddressId: existingAddress.id,
                    })
                } else {
                    const shippingAddress = await createAddress({
                        fullName: name,
                        line1: address.line1,
                        line2: address.line2 || undefined,
                        city: address.city,
                        state: address.state,
                        postalCode: address.postal_code,
                        countryCode: address.country,
                        ownerId: customer?.id,
                    })

                    await updateCheckout({
                        email,
                        shippingAddressId: shippingAddress.id,
                    })
                }
            } catch {
                // TODO: toast('An error has occurred while processing your payment. You have not been charged.')
                setSubmitting(false)
                return
            }
        }

        const { origin, pathname, search } = window.location

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${origin + pathname + search}`,
            },
        })

        if (error.type === 'card_error' || error.type === 'validation_error') {
            setMessage(error.message!)
            setSubmitting(false)
        } else {
            setMessage('An unexpected error occurred.')
            setSubmitting(false)
        }
    }

    const contacts: ContactOption[] =
        customer?.addresses.map(address => ({
            name: address.fullName,
            address: {
                line1: address.line1,
                line2: address.line2 ?? undefined,
                city: address.city,
                state: address.state,
                postal_code: address.postalCode,
                country: address.countryCode,
            },
        })) ?? []

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-8"
                noValidate
            >
                <div className="flex flex-col gap-2">
                    <h2 className="font-semibold text-2xl">Address</h2>
                    <AddressElement
                        options={{
                            mode: 'shipping',
                            allowedCountries: ['US'],
                            contacts: contacts,
                        }}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <h2 className="font-semibold text-2xl">Payment</h2>
                    <PaymentElement options={{ layout: 'tabs' }} />
                    {message && <p className="text-red-500">{message}</p>}
                </div>
                <button
                    disabled={submitting || !stripe || !elements}
                    id="submit"
                >
                    {submitting ? 'Submitting...' : 'Place order'}
                </button>
            </form>
        </div>
    )
}

export default CheckoutForm
