import Link from 'next/link'
import { ColumnDef } from '@tanstack/react-table'

import PriceRepr from '@/components/common/PriceRepr'
import SortableColumnHeader from '@/components/common/SortableColumnHeader'
import { buildDataTableColumns } from '@/utils'

export const componentTableColumns: ColumnDef<Component>[] =
    buildDataTableColumns(
        [
            {
                accessorKey: 'title',
                header: ({ column, table }) => (
                    <SortableColumnHeader column={column} table={table}>
                        Title
                    </SortableColumnHeader>
                ),
                cell: ({ row }) => (
                    <Link href={`/admin/components/${row.original.id}`}>
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
                accessorKey: 'totalInventory',
                header: ({ column, table }) => (
                    <SortableColumnHeader column={column} table={table}>
                        Quantity
                    </SortableColumnHeader>
                ),
            },
            {
                accessorKey: 'vendor.name',
                header: ({ column, table }) => (
                    <SortableColumnHeader column={column} table={table}>
                        Brand
                    </SortableColumnHeader>
                ),
            },
            {
                accessorKey: 'category.label',
                header: ({ column, table }) => (
                    <SortableColumnHeader column={column} table={table}>
                        Category
                    </SortableColumnHeader>
                ),
            },
            {
                accessorKey: 'size.label',
                header: ({ column, table }) => (
                    <SortableColumnHeader column={column} table={table}>
                        Size
                    </SortableColumnHeader>
                ),
            },
            {
                accessorKey: 'color.label',
                header: ({ column, table }) => (
                    <SortableColumnHeader column={column} table={table}>
                        Color
                    </SortableColumnHeader>
                ),
            },
        ],
        'id',
        { sortable: true }
    )
