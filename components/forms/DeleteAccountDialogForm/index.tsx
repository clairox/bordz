'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/AlertDialog'
import DeleteAccountFormSchema from './schema'
import { useFormMessage } from '@/hooks/forms'
import { useDeleteAccount } from '@/hooks/data/account'
import { Fragment, useEffect } from 'react'
import { UNEXPECTED_ERROR_TEXT } from '@/utils/constants'
import { AuthApiError } from '@supabase/supabase-js'
import { Form } from '@/components/ui/Form'
import FormMessage from '@/components/ui/FormMessage'
import ButtonAsync from '@/components/ui/ButtonAsync'
import { FormPasswordField } from '@/components/formControls'

type FieldValues = z.infer<typeof DeleteAccountFormSchema>

type DeleteAccountDialogFormProps = {
    open: boolean
    setOpen: (value: boolean) => void
}

export const DeleteAccountDialogForm: React.FC<
    DeleteAccountDialogFormProps
> = ({ open, setOpen }) => {
    const form = useForm<FieldValues>({
        resolver: zodResolver(DeleteAccountFormSchema),
        defaultValues: { password: '' },
    })

    const {
        message,
        type: messageType,
        showMessage,
        clearMessage,
    } = useFormMessage()

    const deleteAccount = useDeleteAccount()

    useEffect(() => {
        if (deleteAccount.error) {
            const error = deleteAccount.error
            console.log(error)
            if ((error as AuthApiError).code === 'invalid_credentials') {
                showMessage('Password is incorrect.')
            } else {
                showMessage(UNEXPECTED_ERROR_TEXT)
            }
        }
    }, [deleteAccount.error, showMessage])

    useEffect(() => {
        if (deleteAccount.isSuccess) {
            setOpen(false)
        }
    }, [deleteAccount.isSuccess, setOpen])

    const handleSubmit: SubmitHandler<FieldValues> = async (
        data: FieldValues
    ) => {
        clearMessage()
        deleteAccount.mutate(data)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex flex-col gap-6"
                noValidate
            >
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Account</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete your account? This
                        action is permanent and cannot be undone. Please type in
                        your password to confirm.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="flex flex-col gap-6">
                    {message && (
                        <div className="mx-4">
                            <FormMessage type={messageType} message={message} />
                        </div>
                    )}
                    <div className="px-4">
                        <FormPasswordField
                            name="password"
                            placeholder="Password"
                            control={form.control}
                            schema={DeleteAccountFormSchema}
                        />
                    </div>
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setOpen(false)}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <ButtonAsync
                            variant="destructive"
                            type="submit"
                            loading={deleteAccount.isPending}
                            success={deleteAccount.isSuccess}
                        >
                            Delete
                        </ButtonAsync>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </form>
        </Form>
    )
}
