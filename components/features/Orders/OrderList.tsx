import Link from 'next/link'

import PriceRepr from '@/components/common/PriceRepr'
import StoredPreviewImage from '@/components/common/StoredPreviewImage'
import { Button } from '@/components/ui/Button'

type OrderListProps = {
    orders: Order[]
}

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
    if (orders.length === 0) {
        return (
            <div className="flex justify-center items-center w-full h-full">
                <p>
                    You have not yet placed an order. Go to your{' '}
                    <Link href="/cart">cart</Link>?
                </p>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-[1px] bg-gray-500">
            <div className="flex justify-start gap-8 p-8 pb-4 bg-white">
                <Button disabled>Last 60 days</Button>
                <Button>2025</Button>
                <Button>2024</Button>
                <Button>2023</Button>
                <Button>2022</Button>
                <Button>2021 and earlier</Button>
            </div>
            {orders.map(order => (
                <OrderCard key={order.id} order={order} />
            ))}
        </div>
    )
}

type OrderCardProps = {
    order: Order
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
    return (
        <div className="bg-white">
            <div className="flex justify-between items-end px-8 pt-6 pb-1 border-b border-gray-300">
                <div className="flex gap-3 items-end">
                    <Link href={`/account/orders/${order.id}`}>
                        <h2 className="text-lg">Order #{order.id}</h2>
                    </Link>
                    <div className="text-gray-600">
                        {order.createdAt.toDateString()}
                    </div>
                </div>
                <p className="text-lg">
                    <PriceRepr value={order.total} />
                </p>
            </div>
            <div className="flex gap-12 p-8 w-full">
                {order.lines.map(line => (
                    <div key={line.id} className="max-w-52  bg-white">
                        <StoredPreviewImage
                            path={line.product?.board?.deck.images?.[0]}
                            alt={'product image'}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export { OrderList }
