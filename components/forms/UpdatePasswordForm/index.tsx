'use client'

import { useUpdatePassword } from '@/hooks/data/account'
import { AuthError } from '@supabase/supabase-js'
import DataForm from '@/components/common/DataForm'
import UpdatePasswordFormSchema from './schema'

const UpdatePasswordForm = () => {
    const { mutateAsync: updatePassword } = useUpdatePassword()

    return (
        <DataForm
            Schema={UpdatePasswordFormSchema}
            defaultValues={{
                password: '',
                passwordConfirmation: '',
            }}
            fieldData={[
                {
                    type: 'password',
                    name: 'password',
                    label: 'Password',
                    placeholder: 'Password',
                },
                {
                    type: 'password',
                    name: 'passwordConfirmation',
                    label: 'Confirm Password',
                    placeholder: 'Confirm Password',
                },
            ]}
            onSubmit={async data => {
                await updatePassword({ password: data.password })
            }}
            resetOnSuccess={true}
            successMessage="Password updated successfully!"
            getErrorMessage={error => {
                if ((error as AuthError).code === 'same_password') {
                    return 'Cannot use the same password as the current one.'
                }
            }}
        />
    )
}

export default UpdatePasswordForm
