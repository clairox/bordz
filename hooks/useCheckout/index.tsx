'use client'

import { useSuspenseQuery } from '@tanstack/react-query'

import { fetchCheckout } from '@/lib/api'
import checkoutResponseToCheckout from '@/utils/helpers/checkoutResponseToCheckout'

const useCheckout = () => {
    return useSuspenseQuery<Checkout>({
        queryKey: ['checkout'],
        queryFn: async () => {
            const data = await fetchCheckout()
            return checkoutResponseToCheckout(data)
        },
    })
}

export default useCheckout
