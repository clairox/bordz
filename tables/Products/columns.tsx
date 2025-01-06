import Link from 'next/link'
import { ColumnDef } from '@tanstack/react-table'

import PriceRepr from '@/components/PriceRepr'
import SortableColumnHeader from '@/components/SortableColumnHeader'
import buildDataTableColumns from '@/utils/helpers/buildDataTableColumns'

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
