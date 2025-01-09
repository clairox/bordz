'use client'

import { useSuspenseQuery } from '@tanstack/react-query'

import { fetchCheckout } from '@/lib/api'

const useCheckout = () => {
    return useSuspenseQuery<Checkout>({
        queryKey: ['checkout'],
        queryFn: fetchCheckout,
    })
}

export default useCheckout
