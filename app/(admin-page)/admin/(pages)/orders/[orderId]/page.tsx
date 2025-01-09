'use client'

import { useParams } from 'next/navigation'
import { useSuspenseQuery } from '@tanstack/react-query'

import fetchOrder from '@/lib/api/fetchOrder'
import UpdateOrderForm from '@/components/Forms/UpdateOrderForm'
import orderResponseToOrder from '@/utils/helpers/orderResponseToOrder'

const OrderPage = () => {
    const { orderId } = useParams<Record<string, string>>()
    const { data: order } = useSuspenseQuery<Order>({
        queryKey: ['order', orderId],
        queryFn: async () => {
            const response = await fetchOrder(orderId)
            return orderResponseToOrder(response)
        },
    })

    return <UpdateOrderForm order={order} />
}

export default OrderPage
