'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { AuthError } from '@supabase/supabase-js'

import { useUpdatePersonalDetails } from '@/hooks/data/account'
import { useFormMessage } from '@/hooks/forms'
import PersonalDetailsFormSchema from './schema'
import FormMessage from '@/components/ui/FormMessage'
import { FormInput } from '@/components/formControls'
import ButtonAsync from '@/components/ui/ButtonAsync'

type FormData = z.infer<typeof PersonalDetailsFormSchema>

type PersonalDetailsFormProps = {
    defaultValues: {
        email: string
        firstName: string
        lastName: string
        phone?: string
    }
}

const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({
    defaultValues,
}) => {
    const form = useForm<FormData>({
        resolver: zodResolver(PersonalDetailsFormSchema),
        defaultValues: { ...defaultValues, phone: defaultValues.phone ?? '' },
    })

    const {
        mutateAsync: updatePersonalDetails,
        isPending,
        isSuccess,
    } = useUpdatePersonalDetails()

    const {
        message,
        type: messageType,
        showMessage,
        clearMessage,
    } = useFormMessage()

    const handleSubmit: SubmitHandler<FormData> = async (data: FormData) => {
        clearMessage()

        try {
            await updatePersonalDetails(data)
            showMessage('Personal details updated successfully!')
        } catch (error) {
            if ((error as AuthError).message === 'over_email_send_rate_limit') {
                showMessage('Too many attempts. Please wait a moment.')
            }
            showMessage('An unexpected error has occurred.')
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
                <FormInput name="email" label="Email" form={form} />
                <FormInput name="firstName" label="First name" form={form} />
                <FormInput name="lastName" label="Last name" form={form} />
                <FormInput name="phone" label="Phone" form={form} />
                <ButtonAsync
                    type="submit"
                    loading={isPending}
                    success={isSuccess}
                    shouldReset
                >
                    Update personal details
                </ButtonAsync>
            </form>
        </div>
    )
}

export default PersonalDetailsForm
