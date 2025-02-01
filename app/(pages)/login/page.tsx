import LinkToLogin from '@/components/common/LinkToLogin'
import LinkToSignup from '@/components/common/LinkToSignup'
import LoginForm from '@/components/forms/LoginForm'
import SignupForm from '@/components/forms/SignupForm'
import { Fragment } from 'react'

type LoginPageProps = {
    searchParams: { register?: boolean }
}

const LoginPage: React.FC<LoginPageProps> = ({ searchParams }) => {
    return (
        <div className="flex justify-center">
            <div className="p-8 w-[500px]">
                {searchParams.register ? (
                    <Fragment>
                        <h2>Sign up</h2>
                        <SignupForm />
                        <LinkToLogin />
                    </Fragment>
                ) : (
                    <Fragment>
                        <h2>Log in</h2>
                        <LoginForm />
                        <LinkToSignup />
                    </Fragment>
                )}{' '}
            </div>
        </div>
    )
}

export default LoginPage
