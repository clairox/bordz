import fetchAbsolute from '@/lib/fetchAbsolute'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type ProcessingStatus = 'idle' | 'loading' | 'error' | 'success'

const ProcessCheckoutCompletion = () => {
    const router = useRouter()

    const [status, setStatus] = useState<ProcessingStatus>('idle')
    const [orderId, setOrderId] = useState<string | null>(null)

    useEffect(() => {
        const completeCheckout = async () => {
            setStatus('loading')

            const res = await fetchAbsolute('/checkout/complete', {
                method: 'POST',
            })

            if (!res.ok) {
                setStatus('error')
            } else {
                const data = await res.json()
                setOrderId(data.orderId)
                setStatus('success')
            }
        }
        if (status === 'idle') {
            completeCheckout()
        }
    }, [status])

    useEffect(() => {
        if (orderId) {
            router.replace(`/order/confirmation?order=${orderId}`)
        }
    }, [status, router, orderId])

    useEffect(() => {
        if (status === 'error') {
            // TODO: Redirect to error page or something if 'error'
        }
    }, [status, router])

    return <div>Processing...</div>
}

export default ProcessCheckoutCompletion
