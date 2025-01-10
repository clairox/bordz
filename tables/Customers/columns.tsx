import Link from 'next/link'
import { ColumnDef } from '@tanstack/react-table'

import SortableColumnHeader from '@/components/common/SortableColumnHeader'
import { buildDataTableColumns } from '@/utils'

export const customerTableColumns: ColumnDef<Customer>[] =
    buildDataTableColumns(
        [
            {
                accessorKey: 'displayName',
                header: ({ column, table }) => (
                    <SortableColumnHeader column={column} table={table}>
                        Name
                    </SortableColumnHeader>
                ),
                cell: ({ row }) => (
                    <Link href={`/admin/customers/${row.original.userId}`}>
                        {row.getValue('displayName')}
                    </Link>
                ),
            },
            {
                accessorKey: 'email',
                header: ({ column, table }) => (
                    <SortableColumnHeader column={column} table={table}>
                        Email
                    </SortableColumnHeader>
                ),
            },
            {
                accessorKey: 'numberOfOrders',
                header: ({ column, table }) => (
                    <SortableColumnHeader column={column} table={table}>
                        No. of Orders
                    </SortableColumnHeader>
                ),
            },
            {
                accessorKey: 'phone',
                header: 'Phone',
            },
            {
                accessorKey: 'defaultAddress.formatted',
                header: 'Default Address',
            },
        ],
        'userId',
        { sortable: true }
    )
