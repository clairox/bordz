'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { DataTable } from '@/components/ui/DataTable'
import { useAdminListOrders } from '@/hooks/data/order'
import { deleteOrders } from '@/lib/api'
import { orderTableColumns } from '@/tables/Orders/columns'

const OrdersPage = () => {
    const { data, hasNextPage, fetchNextPage } = useAdminListOrders()
    const { mutateAsync: deleteOrders } = useDeleteOrders()

    return (
        <div>
            <h1>Orders</h1>
            <DataTable
                columns={orderTableColumns}
                data={data.pages}
                hasNextPage={hasNextPage}
                fetchNextPage={fetchNextPage}
                deleteRows={deleteOrders}
            />
        </div>
    )
}

const useDeleteOrders = () => {
    const queryClient = useQueryClient()
    return useMutation<void, Error, string[]>({
        mutationFn: deleteOrders,
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ['orders'] }),
    })
}

export default OrdersPage
