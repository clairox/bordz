'use client'

import InfiniteItemList from '@/components/InfiniteItemList'
import PriceRepr from '@/components/PriceRepr'
import { Table, TableCell, TableHeader, TableRow } from '@/components/Table'
import { useOrders } from '@/hooks'

const OrdersPage = () => {
    const { data, hasNextPage, fetchNextPage } = useOrders()

    return (
        <div>
            <h1>Orders</h1>
            <Table>
                <thead>
                    <tr>
                        <TableHeader>ID</TableHeader>
                        <TableHeader>Date Placed</TableHeader>
                        <TableHeader>Total</TableHeader>
                        <TableHeader>Customer Name</TableHeader>
                        <TableHeader>Customer Email</TableHeader>
                        <TableHeader>Shipping Address</TableHeader>
                    </tr>
                </thead>
                <InfiniteItemList
                    pages={data.pages}
                    hasNextPage={hasNextPage}
                    fetchNextPage={fetchNextPage}
                    render={items => {
                        return <OrderTableBody orders={items} />
                    }}
                />
            </Table>
        </div>
    )
}

type OrderTableBodyProps = {
    orders: Order[]
}

const OrderTableBody: React.FC<OrderTableBodyProps> = ({ orders }) => {
    return (
        <tbody>
            {orders.map(order => {
                return <OrderTableRow order={order} key={order.id} />
            })}
        </tbody>
    )
}

type OrderTableRowProps = {
    order: Order
}

const OrderTableRow: React.FC<OrderTableRowProps> = ({ order }) => {
    return (
        <TableRow>
            <TableCell>{order.id}</TableCell>
            <TableCell>
                {new Date(order.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell>
                <PriceRepr value={order.total} />
            </TableCell>
            <TableCell>{order.customer?.displayName || ''}</TableCell>
            <TableCell>{order.email}</TableCell>
            <TableCell>{order.shippingAddress?.formatted || ''}</TableCell>
        </TableRow>
    )
}

export default OrdersPage
