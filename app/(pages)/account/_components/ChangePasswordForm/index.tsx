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
import { AuthError } from '@supabase/supabase-js'

type FormData = z.infer<typeof ChangePasswordFormSchema>

const ChangePasswordForm = () => {
    const form = useForm<FormData>({
        resolver: zodResolver(ChangePasswordFormSchema),
        defaultValues: {
            password: '',
            passwordConfirmation: '',
        },
    })

    const {
        mutateAsync: updatePassword,
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
        if (form.formState.isSubmitSuccessful) {
            form.reset()
        }
    }, [form])

    const handleSubmit: SubmitHandler<FormData> = async (data: FormData) => {
        clearMessage()

        try {
            await updatePassword({ password: data.password })
            showMessage('Password changed successfully.', 'success')
        } catch (error) {
            if ((error as AuthError).code === 'same_password') {
                showMessage(
                    'Cannot use the same password as the current one.',
                    'error'
                )
            } else {
                showMessage('An unexpected error has occurred', 'error')
            }
        }
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
                <ButtonAsync
                    shouldReset
                    loading={isPending}
                    success={isSuccess}
                >
                    Change password
                </ButtonAsync>
            </form>
        </div>
    )
}

export default ChangePasswordForm
