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
import LoginFormSchema from './schema'

type FormData = z.infer<typeof LoginFormSchema>

type UseLoginVariables = {
    email: string
    password: string
}

const LoginForm = () => {
    const form = useForm<FormData>({
        resolver: zodResolver(LoginFormSchema),
    })

    const router = useRouter()
    const { auth } = useSupabase()

    const {
        mutateAsync: login,
        isPending,
        isSuccess,
    } = useMutation<void, Error, UseLoginVariables>({
        mutationFn: async ({ email, password }) => {
            try {
                const { error } = await auth.signInWithPassword({
                    email,
                    password,
                })

                if (error) {
                    throw error
                }
            } catch (error) {
                throw error
            }
        },
    })

    const [message, setMessage] = useState<string | null>(null)

    const handleSubmit: SubmitHandler<FormData> = async (data: FormData) => {
        setMessage(null)

        try {
            await login(data)
            router.push('/')
        } catch {
            setMessage('An error has occurred.')
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
                    <Link href={'/login?register=true'}>Sign up</Link>
                </p>
            </form>
        </Fragment>
    )
}

export default LoginForm
