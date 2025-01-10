'use client'

import { useSuspenseQuery } from '@tanstack/react-query'

import { fetchCheckout } from '@/lib/api'
import { mapCheckoutResponseToCheckout } from '@/utils/conversions'

export const useCheckout = () => {
    return useSuspenseQuery<Checkout>({
        queryKey: ['checkout'],
        queryFn: async () => {
            const data = await fetchCheckout()
            return mapCheckoutResponseToCheckout(data)
        },
    })
}
