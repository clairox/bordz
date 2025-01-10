'use client'

import { Fragment, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import FormInput from '@/components/formControls/FormInput'
import ButtonAsync from '@/components/ui/ButtonAsync'
import LoginFormSchema from './schema'
import { useLogin } from '@/hooks/auth'

type FormData = z.infer<typeof LoginFormSchema>

type LoginFormProps = {
    redirectTo?: string
}

const LoginForm: React.FC<LoginFormProps> = ({ redirectTo = '/' }) => {
    const form = useForm<FormData>({
        resolver: zodResolver(LoginFormSchema),
    })

    const pathname = usePathname()

    const { mutateAsync: login, isPending, isSuccess } = useLogin(redirectTo)

    const [message, setMessage] = useState<string | null>(null)

    const handleSubmit: SubmitHandler<FormData> = async (data: FormData) => {
        setMessage(null)

        try {
            await login(data)
        } catch {
            setMessage('An error has occurred.')
        }
    }

    return (
        <Fragment>
            <h2>Log in</h2>
            {message && <p>{message}</p>}
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex flex-col gap-8"
                noValidate
            >
                <FormInput name="email" label="Email" form={form} autoFocus />
                <FormInput
                    type="password"
                    name="password"
                    label="Password"
                    form={form}
                />
                <ButtonAsync loading={isPending} success={isSuccess}>
                    Login
                </ButtonAsync>
                <p>
                    {"Don't have an account? "}
                    <Link href={pathname + '?register=true'}>Sign up</Link>
                </p>
            </form>
        </Fragment>
    )
}

export default LoginForm
