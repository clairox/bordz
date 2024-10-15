import fetchAbsolute from '@/lib/fetchAbsolute'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type ProcessingStatus = 'idle' | 'loading' | 'error' | 'success'

const ProcessCheckoutCompletion = () => {
    const router = useRouter()

    const [status, setStatus] = useState<ProcessingStatus>('idle')

    useEffect(() => {
        const completeCheckout = async () => {
            setStatus('loading')

            const res = await fetchAbsolute('/checkout/complete', {
                method: 'POST',
            })
            router.replace('gay')

            if (!res.ok) {
                setStatus('error')
            } else {
                const { orderId } = await res.json()
                router.replace(`/order/confirmation?order=${orderId}`)
                setStatus('success')
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
