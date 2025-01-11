'use client'

import { useRouter } from 'next/navigation'

import SignupFormSchema from './schema'
import { useSignUp } from '@/hooks/auth'
import DataForm from '@/components/common/DataForm'

type SignupFormProps = {
    redirectTo?: string
}

const SignupForm: React.FC<SignupFormProps> = ({ redirectTo = '/' }) => {
    const router = useRouter()
    const { mutateAsync: signUp } = useSignUp()

    return (
        <DataForm
            Schema={SignupFormSchema}
            defaultValues={{
                firstName: '',
                lastName: '',
                birthDate: undefined,
                email: '',
                password: '',
            }}
            fieldData={[
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
                    type: 'dateSelect',
                    name: 'birthDate',
                    label: 'Date of Birth',
                },
                {
                    type: 'text',
                    name: 'email',
                    label: 'Email',
                    placeholder: 'Email',
                },
                {
                    type: 'password',
                    name: 'password',
                    label: 'Password',
                    placeholder: 'Password',
                },
            ]}
            onSubmit={async data => {
                await signUp(data)
                router.push(redirectTo)
            }}
            submitButtonContent="Sign Up"
            getErrorMessage={error => {
                if (error instanceof Error) {
                    const message = error.message
                    return message + message.endsWith('.') ? '' : '.'
                }
            }}
        />
        // <FormDateSelect
        //     name="birthDate"
        //     label="Date of Birth"
        //     form={form}
        //     maxYear={CURRENT_YEAR - MIN_ALLOWED_CUSTOMER_AGE}
        // />
    )
}

export default SignupForm
