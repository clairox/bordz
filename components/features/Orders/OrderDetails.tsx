'use client'

import { useOrder } from '@/hooks/data/order'
import { AddressCard } from '../Addresses'
import PriceRepr from '@/components/common/PriceRepr'
import StoredPreviewImage from '@/components/common/StoredPreviewImage'
import { BoardDetailsPopover } from '../Products'

type OrderDetailsProps = {
    id: string
}

export const OrderDetails: React.FC<OrderDetailsProps> = ({ id }) => {
    const { data: order } = useOrder(id)

    return (
        <div className="flex flex-col gap-[1px] bg-gray-400">
            <div className="flex items-end gap-4 px-8 pt-6 pb-2 bg-white">
                <h2>Order #{order.id}</h2>
                <p className="text-gray-600">
                    {order.createdAt.toDateString()}
                </p>
            </div>
            <div className="flex gap-[1px] bg-gray-400">
                <div className="w-full bg-white px-8 py-4">
                    <h3 className="pb-2 font-semibold">Shipping address</h3>
                    <AddressCard address={order.shippingAddress} />
                </div>
                <div className="w-full bg-white px-8 py-4">
                    <h3 className="pb-2 font-semibold">Payment method</h3>
                    <div>Visa ending in 4242</div>
                </div>
                <div className="w-full bg-white px-8 py-4">
                    <h3 className="pb-2 font-semibold">Order summary</h3>
                    <OrderSummary order={order} />
                </div>
            </div>
            <div className="flex items-stretch gap-[1px] w-full bg-gray-400">
                <div className="flex flex-col gap-[1px] w-1/2 h-fit bg-gray-400">
                    {order.lines.map(line => (
                        <OrderLineCard key={line.id} line={line} />
                    ))}
                </div>
                <div className="grow bg-white"></div>
            </div>
        </div>
    )
}

type OrderLineCardProps = {
    line: OrderLine
}

const OrderLineCard: React.FC<OrderLineCardProps> = ({ line }) => {
    return (
        <div className="flex w-full bg-white">
            <div className="w-40 border-r border-gray-400">
                <StoredPreviewImage
                    path={line.product?.featuredImage}
                    alt="product image"
                />
            </div>
            <div className="px-4 py-2 w-full">
                <div className="flex mb-1 gap-4">
                    <h3 className="">{line.product?.title}</h3>
                    {line.product?.productType === 'BOARD' && (
                        <BoardDetailsPopover productId={line.product?.id} />
                    )}
                </div>
                <div className="font-semibold">
                    <PriceRepr value={line.total} />
                </div>
            </div>
        </div>
    )
}

type OrderSummaryProps = {
    order: Order
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ order }) => {
    return (
        <div>
            <div className="flex flex-col gap-1 pb-2">
                <div className="flex justify-between">
                    <div>Subtotal:</div>
                    <div>
                        <PriceRepr value={order.subtotal} />
                    </div>
                </div>
                <div className="flex justify-between">
                    <div>Shipping:</div>
                    <div>
                        <PriceRepr value={order.totalShipping} />
                    </div>
                </div>
                <div className="flex justify-between">
                    <div>Tax:</div>
                    <div>
                        <PriceRepr value={order.totalTax} />
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-between">
                <div className="flex justify-between mb-10 font-semibold">
                    <div>Total:</div>
                    <div>
                        <PriceRepr value={order.total} />
                    </div>
                </div>
            </div>
        </div>
    )
}
