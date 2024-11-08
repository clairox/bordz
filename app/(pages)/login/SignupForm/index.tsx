'use client'

import { Fragment, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'

import { useSupabase } from '@/context/supabaseContext'
import FormInput from '@/components/FormInput'
import ButtonAsync from '@/components/ButtonAsync'
import { CURRENT_YEAR, MIN_ALLOWED_CUSTOMER_AGE } from '@/utils/constants'
import FormDateSelect from '@/components/FormDateSelect'
import fetchAbsolute from '@/lib/fetchAbsolute'
import SignupFormSchema from './schema'
import { User } from '@supabase/supabase-js'

type FormData = z.infer<typeof SignupFormSchema>

// type UseSignupVariables = {
//     firstName: string
//     lastName: string
//     email: string
//     password: string
//     birthDate: Date
// }

const SignupForm = () => {
    const form = useForm<FormData>({
        resolver: zodResolver(SignupFormSchema),
    })

    const router = useRouter()
    const { auth } = useSupabase()

    const {
        mutateAsync: signup,
        isPending: signupIsPending,
        isSuccess: signupIsSuccess,
    } = useMutation<
        User,
        Error,
        {
            email: string
            password: string
        }
    >({
        mutationFn: async ({ email, password }) => {
            try {
                const {
                    data: { user },
                    error,
                } = await auth.signUp({
                    email,
                    password,
                })

                if (error) {
                    throw error
                }

                if (!user) {
                    throw new Error('An unexpected error has occurred.')
                }

                return user
            } catch (error) {
                throw error
            }
        },
    })

    const {
        mutateAsync: createCustomer,
        isPending: createCustomerIsPending,
        isSuccess: createCustomerIsSuccess,
    } = useMutation<
        void,
        Error,
        {
            firstName: string
            lastName: string
            birthDate: Date
            userId: string
        }
    >({
        mutationFn: async ({ firstName, lastName, birthDate, userId }) => {
            try {
                const res = await fetchAbsolute('/customers', {
                    method: 'POST',
                    body: JSON.stringify({
                        firstName,
                        lastName,
                        userId,
                    }),
                })

                if (!res.ok) {
                    throw res
                }

                return await res.json()
            } catch (error) {
                auth.signOut()
                throw error
            }
        },
    })

    const [message, setMessage] = useState<string | null>(null)

    const handleSubmit: SubmitHandler<FormData> = async (data: FormData) => {
        setMessage(null)
        const { firstName, lastName, birthDate, email, password } = data

        try {
            const newUser = await signup({ email, password })
            await createCustomer({
                firstName,
                lastName,
                birthDate,
                userId: newUser.id,
            })

            router.push('/')
        } catch (error) {
            if (!(error instanceof Error)) {
                setMessage('An unexpected error has occurred.')
                return
            }

            setMessage(error.message + '.')
        }
    }

    return (
        <Fragment>
            {message && <p>{message}</p>}
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex flex-col gap-8"
                noValidate
            >
                <FormInput
                    name="firstName"
                    label="First Name"
                    form={form}
                    autoFocus
                />
                <FormInput name="lastName" label="Last Name" form={form} />
                <FormDateSelect
                    name="birthDate"
                    label="Date of Birth"
                    form={form}
                    maxYear={CURRENT_YEAR - MIN_ALLOWED_CUSTOMER_AGE}
                />
                <FormInput name="email" label="Email" form={form} />
                <FormInput
                    type="password"
                    name="password"
                    label="Password"
                    form={form}
                />
                <ButtonAsync
                    loading={signupIsPending || createCustomerIsPending}
                    success={signupIsSuccess || createCustomerIsSuccess}
                >
                    Signup
                </ButtonAsync>
                <p>
                    {'Already have an account? '}
                    <Link href="/login">Log in</Link>
                </p>
            </form>
        </Fragment>
    )
}

export default SignupForm
