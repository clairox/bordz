'use client'

import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useFormMessage } from '@/hooks'
import FormMessage from '@/components/FormMessage'
import { FormInput } from '@/components/Form'
import ButtonAsync from '@/components/ButtonAsync'
import { useUpdatePassword } from '../../_hooks'
import ChangePasswordFormSchema from './schema'

type FormData = z.infer<typeof ChangePasswordFormSchema>

const ChangePasswordForm = () => {
    const form = useForm<FormData>({
        resolver: zodResolver(ChangePasswordFormSchema),
    })

    const {
        mutate: updatePassword,
        error,
        isPending,
        isSuccess,
    } = useUpdatePassword()

    const {
        message,
        type: messageType,
        showMessage,
        clearMessage,
    } = useFormMessage()

    useEffect(() => {
        if (error) {
            showMessage('An error has occurred.', 'error')
        }
    }, [showMessage, error])

    useEffect(() => {
        if (isSuccess) {
            showMessage('Password changed successfully.', 'success')
        }
    }, [showMessage, isSuccess])

    const handleSubmit: SubmitHandler<FormData> = (data: FormData) => {
        clearMessage()

        console.log(data)
        updatePassword()
    }

    return (
        <div>
            {message && <FormMessage type={messageType} message={message} />}
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex flex-col gap-8"
                noValidate
            >
                <FormInput
                    type="password"
                    name="password"
                    label="Password *"
                    form={form}
                    autoFocus
                />
                <FormInput
                    type="password"
                    name="passwordConfirmation"
                    label="Confirm password *"
                    form={form}
                />
                <ButtonAsync loading={isPending} success={isSuccess}>
                    Change password
                </ButtonAsync>
            </form>
        </div>
    )
}

export default ChangePasswordForm
