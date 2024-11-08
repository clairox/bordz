import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

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
