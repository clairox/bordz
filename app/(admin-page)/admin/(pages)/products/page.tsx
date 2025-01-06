'use client'

import { useSearchParams } from 'next/navigation'

import useProducts from '@/hooks/useProducts'
import { DataTable } from '@/components/ShadUI/DataTable'
import { productTableColumns } from '@/tables/Products/columns'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteProducts } from '@/lib/api'

const ProductsPage = () => {
    const searchParams = useSearchParams()
    const page = Number(searchParams.get('page')) || 1
    const pageSize = Number(searchParams.get('size')) || 40
    const orderBy = (searchParams.get('orderBy') as SortKey) || undefined

    const { data, status, fetchNextPage, hasNextPage } = useProducts({
        page,
        size: pageSize,
        orderBy,
    })

    const { mutateAsync: deleteProducts } = useDeleteProducts()

    if (status === 'error') {
        return <div>Error</div>
    }

    if (status === 'pending') {
        return <div>Loading...</div>
    }

    return (
        <div>
            <DataTable
                columns={productTableColumns}
                data={data.pages}
                hasNextPage={hasNextPage}
                fetchNextPage={fetchNextPage}
                deleteRows={deleteProducts}
            />
        </div>
    )
}

const useDeleteProducts = () => {
    const queryClient = useQueryClient()
    return useMutation<void, Error, string[]>({
        mutationFn: deleteProducts,
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ['products'] }),
    })
}

export default ProductsPage
