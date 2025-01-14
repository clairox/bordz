import InfiniteList from '@/components/common/InfiniteList'
import { useOrders } from '@/hooks/data/order'
import { SortKey } from '@/types/sorting'
import { OrderList } from './OrderList'

type OrderListContainerProps = {
    orderBy: SortKey
}

export const OrderListContainer: React.FC<OrderListContainerProps> = ({
    orderBy,
}) => {
    const { data, hasNextPage, fetchNextPage, error, isPending } = useOrders({
        orderBy,
    })

    if (error) {
        throw error
    }

    if (isPending) {
        return <Fallback />
    }

    return (
        <InfiniteList
            pages={data!.pages}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            render={orders => <OrderList orders={orders} />}
        />
    )
}

const Fallback = () => <div>Loading...</div>
