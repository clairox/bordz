'use client'

import LoginFormSchema from './schema'
import { useLogin } from '@/hooks/auth'
import DataForm from '@/components/common/DataForm'

type LoginFormProps = {
    redirectTo?: string
}

const LoginForm: React.FC<LoginFormProps> = ({ redirectTo = '/' }) => {
    const { mutateAsync: login } = useLogin(redirectTo)

    return (
        <DataForm
            Schema={LoginFormSchema}
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

export default LoginForm
