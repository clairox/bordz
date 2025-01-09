import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import fetchAbsolute from '@/lib/fetchAbsolute'
import { CheckoutResponse } from '@/types/api'

type ProcessingStatus = 'idle' | 'loading' | 'error' | 'success'

const ProcessCheckoutCompletion = () => {
    const router = useRouter()

    const [status, setStatus] = useState<ProcessingStatus>('idle')

    useEffect(() => {
        const completeCheckout = async () => {
            setStatus('loading')

            try {
                const data = await fetchAbsolute<CheckoutResponse>(
                    '/checkout/complete',
                    {
                        method: 'POST',
                    }
                )
                const { orderId } = data
                router.replace(`/order/confirmation?order=${orderId}`)
                setStatus('success')
            } catch {
                setStatus('error')
            }
        }
        if (status === 'idle') {
            completeCheckout()
        }
    }, [status, router])

    useEffect(() => {
        if (status === 'error') {
            // TODO: Redirect to error page or something if 'error'
        }
    }, [status, router])

    return <div>Processing...</div>
}

export default ProcessCheckoutCompletion
