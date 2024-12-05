'use client'

import { Fragment, useState } from 'react'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import AdminLoginFormSchema from './schema'
import { FormInput } from '@/components/Form'
import ButtonAsync from '@/components/ButtonAsync'
import { useLogin } from '@/hooks'

type FormData = z.infer<typeof AdminLoginFormSchema>

const AdminLoginForm: React.FC = () => {
    const form = useForm<FormData>({
        resolver: zodResolver(AdminLoginFormSchema),
    })

    const router = useRouter()

    const { mutateAsync: login, isPending, isSuccess } = useLogin()

    const [message, setMessage] = useState<string | null>(null)

    const handleSubmit: SubmitHandler<FormData> = async (data: FormData) => {
        setMessage(null)

        try {
            await login(data)
            router.push('/admin')
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
            </form>
        </Fragment>
    )
}

export default AdminLoginForm
