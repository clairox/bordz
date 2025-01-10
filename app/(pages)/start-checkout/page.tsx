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
                    <SignupForm redirectTo="/checkout" />
                ) : (
                    <LoginForm redirectTo="/checkout" />
                )}
            </div>
            <div className="w-full">
                <ContinueAsGuestForm />
            </div>
        </div>
    )
}

export default StartCheckoutPage
