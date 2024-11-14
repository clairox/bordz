import ContinueAsGuestForm from '@/components/Forms/ContinueAsGuestForm'
import LoginForm from '@/components/Forms/LoginForm'
import SignupForm from '@/components/Forms/SignupForm'

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
