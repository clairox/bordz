'use client'

import DataForm from '@/components/common/DataForm'
import { useUpdatePersonalDetails } from '@/hooks/data/account'
import { useRouter } from 'next/navigation'
import UpdatePersonalDetailsFormSchema from './schema'
import { AuthError } from '@supabase/supabase-js'

type UpdatePersonalDetailsFormProps = {
    customer: Customer
}

const UpdatePersonalDetailsForm: React.FC<UpdatePersonalDetailsFormProps> = ({
    customer,
}) => {
    const { mutateAsync: updatePersonalDetails } = useUpdatePersonalDetails()
    const router = useRouter()

    return (
        <DataForm
            Schema={UpdatePersonalDetailsFormSchema}
            defaultValues={{
                email: customer.email,
                firstName: customer.firstName,
                lastName: customer.lastName,
                phone: customer.phone ?? '',
            }}
            fieldData={[
                {
                    type: 'text',
                    name: 'email',
                    label: 'Email',
                    placeholder: 'Email',
                },
                {
                    type: 'text',
                    name: 'firstName',
                    label: 'First Name',
                    placeholder: 'First Name',
                },
                {
                    type: 'text',
                    name: 'lastName',
                    label: 'Last Name',
                    placeholder: 'Last Name',
                },
                {
                    type: 'text',
                    name: 'phone',
                    label: 'Phone',
                    placeholder: 'Phone',
                },
            ]}
            onSubmit={async data => {
                await updatePersonalDetails(data)
                router.push('/account/settings')
            }}
            getErrorMessage={error => {
                if (
                    (error as AuthError).message ===
                    'over_email_send_rate_limit'
                ) {
                    return 'Too many attempts. Please wait a moment.'
                }
            }}
        />
    )
}

export default UpdatePersonalDetailsForm
