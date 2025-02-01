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
                    <div className="flex justify-center">
                        <div className="p-8 w-[500px]">
                            <h2>Sign up</h2>
                            <SignupForm redirectTo="/checkout" />

                            <LinkToLogin />
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center">
                        <div className="p-8 w-[500px]">
                            <h2>Log in</h2>
                            <LoginForm />
                            <LinkToSignup />
                        </div>
                    </div>
                )}
            </div>
            <div className="w-full">
                <div className="flex justify-center">
                    <div className="p-8 w-[500px]">
                        <h2>Continue as Guest</h2>
                        <ContinueAsGuestForm />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StartCheckoutPage
