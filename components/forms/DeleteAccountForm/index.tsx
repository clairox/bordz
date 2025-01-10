'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { AuthApiError } from '@supabase/supabase-js'

import DeleteAccountFormSchema from './schema'
import { useDeleteAccount } from '@/hooks/data/account'
import { useFormMessage } from '@/hooks/forms'
import FormMessage from '@/components/ui/FormMessage'
import { FormInput } from '@/components/formControls'
import ButtonAsync from '@/components/ui/ButtonAsync'

type FormData = z.infer<typeof DeleteAccountFormSchema>

const DeleteAccountForm: React.FC = () => {
    const form = useForm<FormData>({
        resolver: zodResolver(DeleteAccountFormSchema),
        defaultValues: {
            password: '',
        },
    })

    const {
        mutateAsync: deleteAccount,
        isPending,
        isSuccess,
    } = useDeleteAccount()

    const {
        message,
        type: messageType,
        showMessage,
        clearMessage,
    } = useFormMessage()

    const handleSubmit: SubmitHandler<FormData> = async (data: FormData) => {
        clearMessage()

        try {
            await deleteAccount(data)
        } catch (error) {
            if ((error as AuthApiError).code === 'invalid_credentials') {
                showMessage('Password is incorrect.', 'error')
            } else {
                console.log(error)
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
                    label="Confirm password *"
                    form={form}
                />
                <ButtonAsync loading={isPending} success={isSuccess}>
                    Delete account
                </ButtonAsync>
            </form>
        </div>
    )
}

export default DeleteAccountForm
