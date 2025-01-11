import LinkToLogin from '@/components/common/LinkToLogin'
import LinkToSignup from '@/components/common/LinkToSignup'
import LoginForm from '@/components/forms/LoginForm'
import SignupForm from '@/components/forms/SignupForm'

type LoginPageProps = {
    searchParams: { register?: boolean }
}

const LoginPage: React.FC<LoginPageProps> = ({ searchParams }) => {
    if (searchParams.register) {
        return (
            <div>
                <h2>Sign up</h2>
                <SignupForm />
                <LinkToLogin />
            </div>
        )
    } else {
        return (
            <div>
                <h2>Log in</h2>
                <LoginForm />
                <LinkToSignup />
            </div>
        )
    }
}

export default LoginPage
