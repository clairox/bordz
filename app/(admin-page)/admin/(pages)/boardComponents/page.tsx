'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useBoardComponents } from '@/hooks/data/boardComponent'
import { DataTable } from '@/components/ui/DataTable'
import { boardComponentTableColumns } from '@/tables/BoardComponents/columns'
import { deleteBoardComponents } from '@/lib/api'
import { SortKey } from '@/types/sorting'

const BoardComponentsPage: React.FC = () => {
    const searchParams = useSearchParams()
    const pageSize = Number(searchParams.get('size')) || 40
    const orderBy = (searchParams.get('orderBy') as SortKey) || 'alpha-asc'

    const { data, fetchNextPage, hasNextPage } = useBoardComponents({
        size: pageSize,
        orderBy,
    })

    const { mutateAsync: deleteBoardComponents } = useDeleteBoardComponents()

    const router = useRouter()

    return (
        <div className="p-4">
            <h1>BoardComponents</h1>
            <div className="flex justify-end">
                <button
                    onClick={() => router.push('/admin/boardComponents/new')}
                >
                    New
                </button>
            </div>
            <DataTable
                columns={boardComponentTableColumns}
                data={data.pages}
                hasNextPage={hasNextPage}
                fetchNextPage={fetchNextPage}
                deleteRows={deleteBoardComponents}
            />
        </div>
    )
}

const useDeleteBoardComponents = () => {
    const queryClient = useQueryClient()
    return useMutation<void, Error, string[]>({
        mutationFn: deleteBoardComponents,
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ['boardComponents'] }),
    })
}

export default BoardComponentsPage
