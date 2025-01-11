'use client'

import AdminLoginFormSchema from './schema'
import { useLogin } from '@/hooks/auth'
import DataForm from '@/components/common/DataForm'

type AdminLoginFormProps = {
    redirectTo?: string
}

const AdminLoginForm: React.FC<AdminLoginFormProps> = ({
    redirectTo = '/',
}) => {
    const { mutateAsync: login } = useLogin(redirectTo)

    return (
        <DataForm
            Schema={AdminLoginFormSchema}
            defaultValues={{
                email: '',
                password: '',
            }}
            fieldData={[
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
            onSubmit={async data => await login(data)}
            submitButtonContent="Log In"
        />
    )
}

export default AdminLoginForm
