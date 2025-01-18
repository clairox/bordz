'use client'

import { AuthApiError } from '@supabase/supabase-js'

import DeleteAccountFormSchema from './schema'
import { useDeleteAccount } from '@/hooks/data/account'
import DataForm from '@/components/common/DataForm'

const DeleteAccountForm: React.FC = () => {
    const { mutateAsync: deleteAccount } = useDeleteAccount()

    return (
        <DataForm
            Schema={DeleteAccountFormSchema}
            defaultValues={{
                password: '',
            }}
            fieldData={[
                {
                    type: 'password',
                    name: 'password',
                    label: 'Password',
                    placeholder: 'Password',
                },
            ]}
            onSubmit={async data => await deleteAccount(data)}
            submitButtonContent="Delete Account"
            submitButtonVariant="destructive"
            getErrorMessage={error => {
                if ((error as AuthApiError).code === 'invalid_credentials') {
                    return 'Password is incorrect.'
                }
            }}
        />
    )
}

export default DeleteAccountForm
