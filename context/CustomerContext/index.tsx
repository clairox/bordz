'use client'

import { createContext, useContext } from 'react'
import { UseQueryResult } from '@tanstack/react-query'

import { useProvideCustomer } from './useProvideCustomer'

type CustomerContextValue = UseQueryResult<Customer | null>
type CustomerProviderProps = React.PropsWithChildren<{ initialData?: Customer }>

const CustomerContext = createContext<CustomerContextValue>(
    {} as CustomerContextValue
)
const useCustomer = () => useContext(CustomerContext)

const CustomerProvider: React.FC<CustomerProviderProps> = ({
    initialData,
    children,
}) => {
    const customer = useProvideCustomer(initialData)

    return (
        <CustomerContext.Provider value={customer}>
            {children}
        </CustomerContext.Provider>
    )
}

export { useCustomer, CustomerProvider }
