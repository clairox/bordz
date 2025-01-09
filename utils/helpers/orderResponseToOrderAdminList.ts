import { OrderResponse } from '@/types/api'

const orderResponseToOrderAdminList = (data: OrderResponse): OrderAdminList => {
    return {
        id: data.id,
        customerEmail: data.customer?.email,
        customerName: data.customer?.displayName,
        total: data.total,
        shippingAddress: data.shippingAddress.formatted,
        createdAt: data.createdAt,
    }
}

export default orderResponseToOrderAdminList
