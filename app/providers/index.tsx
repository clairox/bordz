import { AuthProvider } from './Auth'
import { CartProvider } from './Cart'

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <AuthProvider>
            <CartProvider>{children}</CartProvider>
        </AuthProvider>
    )
}

export default Providers
