'use client'

import { Fragment, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { User } from '@supabase/supabase-js'

import { useSupabase } from '@/context/SupabaseContext'
import FormInput from '@/components/Form/FormInput'
import ButtonAsync from '@/components/ButtonAsync'
import { CURRENT_YEAR, MIN_ALLOWED_CUSTOMER_AGE } from '@/utils/constants'
import FormDateSelect from '@/components/Form/FormDateSelect'
import SignupFormSchema from './schema'
import { useAuthQuery } from '@/context/AuthContext'

type FormData = z.infer<typeof SignupFormSchema>

type SignupFormProps = {
    redirectTo?: string
}

const SignupForm: React.FC<SignupFormProps> = ({ redirectTo = '/' }) => {
    const form = useForm<FormData>({
        resolver: zodResolver(SignupFormSchema),
    })

    const router = useRouter()
    const pathname = usePathname()
    const supabase = useSupabase()
    const {
        createCustomerMutation: {
            mutateAsync: createCustomer,
            isPending: createCustomerIsPending,
            isSuccess: createCustomerIsSuccess,
        },
    } = useAuthQuery()

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
                } = await supabase.auth.signUp({
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
            await supabase
                .from('profiles')
                .update({ is_new: false })
                .eq('id', newUser.id)

            router.push(redirectTo)
        } catch (error) {
            if (!(error instanceof Error)) {
                setMessage('An unexpected error has occurred.')
                return
            }

            const message = error.message
            setMessage(message + message.endsWith('.') ? '' : '.')
        }
    }

    return (
        <Fragment>
            <h2>Sign up</h2>
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
                    <Link href={pathname}>Log in</Link>
                </p>
            </form>
        </Fragment>
    )
}

export default SignupForm
