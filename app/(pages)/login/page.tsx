import LoginForm from '@/components/Forms/LoginForm'
import SignupForm from '@/components/Forms/SignupForm'

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
