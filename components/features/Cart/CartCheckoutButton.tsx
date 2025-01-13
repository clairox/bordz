'use client'

import { Button } from '@/components/ui/Button'
import { Skeleton } from '@/components/ui/Skeleton'
import { useCustomer } from '@/context/CustomerContext'
import { useRouter } from 'next/navigation'

type CartCheckoutButtonProps = {
    disabled?: boolean
}

export const CartCheckoutButton: React.FC<CartCheckoutButtonProps> = ({
    disabled = false,
}) => {
    const { data: customer, error, isPending } = useCustomer()
    const router = useRouter()

    if (error) {
        throw error
    }

    if (isPending) {
        return <Skeleton />
    }

    return (
        <Button
            disabled={disabled}
            onClick={() =>
                router.push(customer ? '/checkout' : '/start-checkout')
            }
        >
            Checkout
        </Button>
    )
}