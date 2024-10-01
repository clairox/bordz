'use client'
import { createContext, useContext } from 'react'
type AuthContextValue = {
    user: Customer | null
    status: 'loggedOut' | 'loggedIn'
}
const AuthContext = createContext<AuthContextValue>({} as AuthContextValue)

export const useAuth = () => useContext(AuthContext)

const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <AuthContext.Provider value={{ user: null, status: 'loggedOut' }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider }
