import LoginForm from '@/components/forms/LoginForm'
import SignupForm from '@/components/forms/SignupForm'

type LoginPageProps = {
    searchParams: { register?: string }
}

const LoginPage: React.FC<LoginPageProps> = async ({ searchParams }) => {
    if (searchParams.register) {
        return <SignupForm />
    } else {
        return <LoginForm />
    }
}

export default LoginPage
