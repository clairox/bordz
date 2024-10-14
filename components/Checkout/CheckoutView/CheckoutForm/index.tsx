import {
    AddressElement,
    PaymentElement,
    useElements,
    useStripe,
} from '@stripe/react-stripe-js'
import { useMemo, useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form'
import CheckoutFormSchema from './schema'
import { cn } from '@/utils/helpers'
import fetchAbsolute from '@/lib/fetchAbsolute'
import { useUpdateCheckout } from '@/hooks'

type FormData = z.infer<typeof CheckoutFormSchema>

const CheckoutForm = () => {
    const form = useForm<FormData>({
        resolver: zodResolver(CheckoutFormSchema),
    })

    const stripe = useStripe()
    const elements = useElements()

    const [message, setMessage] = useState<string | null>(null)
    const [submitting, setSubmitting] = useState(false)

    const { mutateAsync: updateCheckout } = useUpdateCheckout()

    type AddressData = {
        fullName: string
        line1: string
        line2?: string
        city: string
        state: string
        postalCode: string
        country: string
    }

    const createAddress = async (data: AddressData) => {
        try {
            const res = await fetchAbsolute('/addresses', {
                method: 'POST',
                body: JSON.stringify(data),
            })

            if (!res.ok) {
                throw res
            }

            return await res.json()
        } catch (error) {
            throw error
        }
    }

    const handleSubmit: SubmitHandler<FormData> = async (data: FormData) => {
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
                    country: address.country,
                })

                await updateCheckout({
                    email: data.email,
                    shippingAddressId: shippingAddress.id,
                })
            } catch {
                // TODO: toast('As error has occurred while processing your payment. You have not been charged.')
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

    // TODO: Move email collection to signup/continue as guest page
    return (
        <div>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex flex-col gap-8"
                noValidate
            >
                <div className="flex flex-col gap-2">
                    <h2 className="font-semibold text-2xl">Contact</h2>
                    {/* TODO: Only show email if customer is logged out */}
                    <div className="flex flex-col gap-2">
                        <FormInput
                            name="email"
                            label="Email"
                            form={form}
                            autoFocus
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <h2 className="font-semibold text-2xl">Address</h2>
                    <AddressElement
                        options={{
                            mode: 'shipping',
                            allowedCountries: ['US'],
                            contacts: [], // TODO: Populate this with Addresses if customer logged in
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

type FormInputProps = {
    name: keyof FormData
    label: string
    form: UseFormReturn<FormData>
    autoFocus?: boolean
}

const FormInput: React.FC<FormInputProps> = ({
    name,
    label,
    form,
    autoFocus = false,
}) => {
    const errors = useMemo(() => form.formState.errors, [form.formState.errors])

    return (
        <div className="flex flex-col gap-2 w-full">
            <label
                htmlFor={name}
                className={errors[name] ? 'text-red-500' : 'text-black'}
            >
                {label}
            </label>
            <input
                type="text"
                id={name}
                {...form.register(name)}
                className={cn(
                    'border focus:outline-none focus:ring-2',
                    errors[name]
                        ? 'border-red-500 focus:ring-red-300'
                        : 'border-black'
                )}
                autoFocus={autoFocus}
            />
            {errors[name] && (
                <p className="text-red-500">{errors[name].message}</p>
            )}
        </div>
    )
}

export default CheckoutForm
