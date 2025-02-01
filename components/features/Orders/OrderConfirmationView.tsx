import PriceRepr from '@/components/common/PriceRepr'
import { BoardDetailsPopover } from '../Products'

type OrderConfirmationViewProps = {
    order: Order
}

export const OrderConfirmationView: React.FC<
    OrderConfirmationViewProps
> = async ({ order }) => {
    return (
        <div className="flex flex-col gap-4">
            {order.lines.map(line => (
                <article
                    key={line.id}
                    className="flex justify-between border-b border-gray-400"
                >
                    <div className="flex gap-4">
                        <h3>
                            {line.quantity} x {line.title}
                        </h3>
                        {line.product && (
                            <BoardDetailsPopover productId={line.product.id} />
                        )}
                    </div>
                    <p>
                        <PriceRepr value={line.total} />
                    </p>
                </article>
            ))}
        </div>
    )
}
