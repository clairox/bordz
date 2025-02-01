import AdminLoginForm from '@/components/forms/AdminLoginForm'

const LoginPage = () => {
    return (
        <div className="flex justify-center">
            <div className="p-8 w-[500px]">
                <h1>Log In</h1>
                <AdminLoginForm />
            </div>
        </div>
    )
}

export default LoginPage
