import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { completeCheckout } from '@/lib/api'

type ProcessingStatus = 'idle' | 'loading' | 'error' | 'success'

const ProcessCheckoutCompletion = () => {
    const router = useRouter()

    const [status, setStatus] = useState<ProcessingStatus>('idle')

    useEffect(() => {
        const _completeCheckout = async () => {
            setStatus('loading')

            try {
                const data = await completeCheckout()
                const { orderId } = data
                router.replace(`/order/confirmation?order=${orderId}`)
                setStatus('success')
            } catch {
                setStatus('error')
            }
        }
        if (status === 'idle') {
            _completeCheckout()
        }
    }, [status, router])

    useEffect(() => {
        if (status === 'error') {
            // TODO: Redirect to error page or something if 'error'
        }
    }, [status, router])

    return <div>Processing...</div>
}

export { ProcessCheckoutCompletion }
