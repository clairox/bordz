'use client'

import { useParams } from 'next/navigation'
import { useSuspenseQuery } from '@tanstack/react-query'

import { fetchOrder } from '@/lib/api'
import AdminUpdateOrderForm from '@/components/forms/AdminUpdateOrderForm'
import { mapOrderResponseToOrder } from '@/utils/conversions'

const OrderPage = () => {
    const { orderId } = useParams<Record<string, string>>()
    const { data: order } = useSuspenseQuery<Order>({
        queryKey: ['order', orderId],
        queryFn: async () => {
            const response = await fetchOrder(orderId)
            return mapOrderResponseToOrder(response)
        },
    })

    return <AdminUpdateOrderForm order={order} />
}

export default OrderPage
