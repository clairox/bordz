'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { DataTable } from '@/components/ui/DataTable'
import { useCustomers } from '@/hooks/data/customer'
import { deleteCustomers } from '@/lib/api'
import { customerTableColumns } from '@/tables/Customers/columns'

const CustomersPage = () => {
    const { data, hasNextPage, fetchNextPage } = useCustomers()
    const { mutateAsync: deleteCustomers } = useDeleteCustomers()

    return (
        <div>
            <h1>Customers</h1>
            <DataTable
                columns={customerTableColumns}
                data={data.pages}
                hasNextPage={hasNextPage}
                fetchNextPage={fetchNextPage}
                deleteRows={deleteCustomers}
            />
        </div>
    )
}

const useDeleteCustomers = () => {
    const queryClient = useQueryClient()
    return useMutation<void, Error, string[]>({
        mutationFn: deleteCustomers,
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ['customers'] }),
    })
}

export default CustomersPage
