'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useComponents } from '@/hooks/data/component'
import { DataTable } from '@/components/ui/DataTable'
import { componentTableColumns } from '@/tables/Components/columns'
import { deleteComponents } from '@/lib/api'
import { SortKey } from '@/types/sorting'

const ComponentsPage: React.FC = () => {
    const searchParams = useSearchParams()
    const pageSize = Number(searchParams.get('size')) || 40
    const orderBy = (searchParams.get('orderBy') as SortKey) || 'alpha-asc'

    const { data, fetchNextPage, hasNextPage } = useComponents({
        size: pageSize,
        orderBy,
    })

    const { mutateAsync: deleteComponents } = useDeleteComponents()

    const router = useRouter()

    return (
        <div className="p-4">
            <h1>Components</h1>
            <div className="flex justify-end">
                <button onClick={() => router.push('/admin/components/new')}>
                    New
                </button>
            </div>
            <DataTable
                columns={componentTableColumns}
                data={data.pages}
                hasNextPage={hasNextPage}
                fetchNextPage={fetchNextPage}
                deleteRows={deleteComponents}
            />
        </div>
    )
}

const useDeleteComponents = () => {
    const queryClient = useQueryClient()
    return useMutation<void, Error, string[]>({
        mutationFn: deleteComponents,
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ['components'] }),
    })
}

export default ComponentsPage
