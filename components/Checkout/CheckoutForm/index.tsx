import { FormEvent, useEffect, useState } from 'react'
import {
    AddressElement,
    PaymentElement,
    useElements,
    useStripe,
} from '@stripe/react-stripe-js'

import fetchAbsolute from '@/lib/fetchAbsolute'
import { useCreateAddress, useUpdateCheckout } from '@/hooks'
import { useRouter } from 'next/navigation'
import { useAuthQuery } from '@/context/AuthContext'
import { ContactOption } from '@stripe/stripe-js'

const CheckoutForm = () => {
    const stripe = useStripe()
    const elements = useElements()

    const router = useRouter()

    const [message, setMessage] = useState<string | null>(null)
    const [submitting, setSubmitting] = useState(false)
    const [email, setEmail] = useState('')

    const {
        auth: { data: auth },
        customer: { data: customer, status: customerStatus },
    } = useAuthQuery()

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
                const shippingAddress = await createAddress({
                    fullName: name,
                    line1: address.line1,
                    line2: address.line2 || undefined,
                    city: address.city,
                    state: address.state,
                    postalCode: address.postal_code,
                    countryCode: address.country,
                })

                await updateCheckout({
                    email,
                    shippingAddressId: shippingAddress.id,
                })
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

    const defaultAddress = customer?.defaultAddress
    const contacts: ContactOption[] = defaultAddress
        ? [
              {
                  name: customer.displayName,
                  address: {
                      line1: defaultAddress.line1,
                      line2: defaultAddress.line2 ?? undefined,
                      city: defaultAddress.city,
                      state: defaultAddress.state,
                      postal_code: defaultAddress.postalCode,
                      country: 'US',
                  },
              },
          ]
        : []

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
                            contacts: contacts, // TODO: Populate this with Addresses if customer logged in
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
