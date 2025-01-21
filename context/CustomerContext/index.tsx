'use client'

import { createContext } from 'react'
import { UseQueryResult } from '@tanstack/react-query'

import { useProvideCustomer } from './useProvideCustomer'

type CustomerContextValue = UseQueryResult<Customer | null>
type CustomerProviderProps = React.PropsWithChildren<{
    initialData?: Customer | null
}>

const CustomerContext = createContext<CustomerContextValue>(
    {} as CustomerContextValue
)

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

export { CustomerContext, CustomerProvider }
