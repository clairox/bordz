'use client'

import { useRouter } from 'next/navigation'

import ContinueAsGuestFormSchema from './schema'
import DataForm from '@/components/common/DataForm'

const ContinueAsGuestForm = () => {
    const router = useRouter()

    return (
        <DataForm
            Schema={ContinueAsGuestFormSchema}
            defaultValues={{
                email: '',
            }}
            fieldData={[
                {
                    type: 'text',
                    name: 'email',
                    label: 'Email',
                    placeholder: 'Email',
                },
            ]}
            onSubmit={async data => {
                sessionStorage.setItem('email', data.email)
                router.push('/checkout')
            }}
            submitButtonContent="Continue"
        />
    )
}

export default ContinueAsGuestForm
