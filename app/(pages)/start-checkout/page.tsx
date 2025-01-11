import LinkToLogin from '@/components/common/LinkToLogin'
import LinkToSignup from '@/components/common/LinkToSignup'
import ContinueAsGuestForm from '@/components/forms/ContinueAsGuestForm'
import LoginForm from '@/components/forms/LoginForm'
import SignupForm from '@/components/forms/SignupForm'

type StartCheckoutPageProps = {
    searchParams: { register?: string }
}
const StartCheckoutPage: React.FC<StartCheckoutPageProps> = ({
    searchParams,
}) => {
    return (
        <div className="flex gap-5 w-full">
            <div className="w-full">
                {searchParams.register ? (
                    <div>
                        <h2>Sign up</h2>
                        <SignupForm redirectTo="/checkout" />

                        <LinkToLogin />
                    </div>
                ) : (
                    <div>
                        <h2>Log in</h2>
                        <LoginForm />
                        <LinkToSignup />
                    </div>
                )}
            </div>
            <div className="w-full">
                <h2>Continue as Guest</h2>
                <ContinueAsGuestForm />
            </div>
        </div>
    )
}

export default StartCheckoutPage
