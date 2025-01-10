import Link from 'next/link'
import { ColumnDef } from '@tanstack/react-table'

import PriceRepr from '@/components/common/PriceRepr'
import SortableColumnHeader from '@/components/common/SortableColumnHeader'
import { buildDataTableColumns } from '@/utils'

export const productTableColumns: ColumnDef<Product>[] = buildDataTableColumns(
    [
        {
            accessorKey: 'title',
            header: ({ column, table }) => (
                <SortableColumnHeader column={column} table={table}>
                    Title
                </SortableColumnHeader>
            ),
            cell: ({ row }) => (
                <Link href={`/admin/products/${row.original.id}`}>
                    {row.getValue('title')}
                </Link>
            ),
        },
        {
            accessorKey: 'price',
            header: ({ column, table }) => (
                <SortableColumnHeader column={column} table={table}>
                    Price
                </SortableColumnHeader>
            ),
            cell: ({ row }) => <PriceRepr value={row.getValue('price')} />,
        },
        {
            accessorKey: 'availableForSale',
            header: ({ column, table }) => (
                <SortableColumnHeader column={column} table={table}>
                    Availability
                </SortableColumnHeader>
            ),
        },
        {
            accessorKey: 'productType',
            header: ({ column, table }) => (
                <SortableColumnHeader column={column} table={table}>
                    Type
                </SortableColumnHeader>
            ),
        },
        {
            accessorKey: 'isPublic',
            header: ({ column, table }) => (
                <SortableColumnHeader column={column} table={table}>
                    Public
                </SortableColumnHeader>
            ),
        },
    ],
    'id',
    { sortable: true }
)
