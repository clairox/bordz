'use client'
import { createContext, useContext } from 'react'

type AuthContextValue = {
    user: Customer | null
    status: 'idle' | 'pending' | 'success'
}
const AuthContext = createContext<AuthContextValue>({} as AuthContextValue)

const useAuth = () => useContext(AuthContext)

const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <AuthContext.Provider value={{ user: null, status: 'success' }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider, useAuth }
