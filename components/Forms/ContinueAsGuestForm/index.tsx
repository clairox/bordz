'use client'

import { Fragment, useState } from 'react'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import FormInput from '@/components/Form/FormInput'
import ContinueAsGuestFormSchema from './schema'

type FormData = z.infer<typeof ContinueAsGuestFormSchema>

const ContinueAsGuestForm = () => {
    const form = useForm<FormData>({
        resolver: zodResolver(ContinueAsGuestFormSchema),
    })

    const router = useRouter()

    const [message, setMessage] = useState<string | null>(null)

    const handleSubmit: SubmitHandler<FormData> = async (data: FormData) => {
        setMessage(null)

        try {
            sessionStorage.setItem('email', data.email)
            router.push('/checkout')
        } catch {
            setMessage('An error has occurred.')
        }
    }

    return (
        <Fragment>
            <h2>Continue as guest</h2>
            {message && <p>{message}</p>}
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex flex-col gap-8"
                noValidate
            >
                <FormInput name="email" label="Email" form={form} autoFocus />
                <button>Continue</button>
            </form>
        </Fragment>
    )
}

export default ContinueAsGuestForm
