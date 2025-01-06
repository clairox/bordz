import Link from 'next/link'
import { ColumnDef } from '@tanstack/react-table'

import PriceRepr from '@/components/PriceRepr'
import SortableColumnHeader from '@/components/SortableColumnHeader'
import buildDataTableColumns from '@/utils/helpers/buildDataTableColumns'

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
                accessorKey: 'componentAttributes.vendor.name',
                header: ({ column, table }) => (
                    <SortableColumnHeader column={column} table={table}>
                        Brand
                    </SortableColumnHeader>
                ),
            },
            {
                accessorKey: 'componentAttributes.category.label',
                header: ({ column, table }) => (
                    <SortableColumnHeader column={column} table={table}>
                        Category
                    </SortableColumnHeader>
                ),
            },
            {
                accessorKey: 'componentAttributes.size.label',
                header: ({ column, table }) => (
                    <SortableColumnHeader column={column} table={table}>
                        Size
                    </SortableColumnHeader>
                ),
            },
            {
                accessorKey: 'componentAttributes.color.label',
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
