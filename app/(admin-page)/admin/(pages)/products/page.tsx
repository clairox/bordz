'use client'

import { useSearchParams } from 'next/navigation'

import { useProducts } from '@/hooks/data/product'
import { DataTable } from '@/components/ui/DataTable'
import { productTableColumns } from '@/tables/Products/columns'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteProducts } from '@/lib/api'
import { SortKey } from '@/types/sorting'

const ProductsPage = () => {
    const searchParams = useSearchParams()
    const page = Number(searchParams.get('page')) || 1
    const pageSize = Number(searchParams.get('size')) || 40
    const orderBy = (searchParams.get('orderBy') as SortKey) || undefined

    const { data, fetchNextPage, hasNextPage } = useProducts({
        page,
        size: pageSize,
        orderBy,
    })

    const { mutateAsync: deleteProducts } = useDeleteProducts()

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
