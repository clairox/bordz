'use client'

import { Fragment, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import FormInput from '@/components/formControls/FormInput'
import ButtonAsync from '@/components/ui/ButtonAsync'
import { CURRENT_YEAR, MIN_ALLOWED_CUSTOMER_AGE } from '@/utils/constants'
import FormDateSelect from '@/components/formControls/FormDateSelect'
import SignupFormSchema from './schema'
import { useSignUp } from '@/hooks/auth'

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
    const {
        mutateAsync: signUp,
        isPending: isSignupPending,
        isSuccess: isSignupSuccess,
    } = useSignUp()

    const [message, setMessage] = useState<string | null>(null)

    const handleSubmit: SubmitHandler<FormData> = async (data: FormData) => {
        setMessage(null)

        try {
            await signUp(data)
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
                    loading={isSignupPending}
                    success={isSignupSuccess}
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
