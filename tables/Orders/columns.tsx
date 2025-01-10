import Link from 'next/link'
import { ColumnDef } from '@tanstack/react-table'

import PriceRepr from '@/components/common/PriceRepr'
import SortableColumnHeader from '@/components/common/SortableColumnHeader'
import { buildDataTableColumns } from '@/utils'

export const orderTableColumns: ColumnDef<OrderAdminList>[] =
    buildDataTableColumns(
        [
            {
                accessorKey: 'id',
                header: ({ column, table }) => (
                    <SortableColumnHeader column={column} table={table}>
                        ID
                    </SortableColumnHeader>
                ),
                cell: ({ row }) => (
                    <Link href={`/admin/orders/${row.getValue('id')}`}>
                        {row.getValue('id')}
                    </Link>
                ),
            },
            {
                accessorKey: 'createdAt',
                header: ({ column, table }) => (
                    <SortableColumnHeader column={column} table={table}>
                        Date Placed
                    </SortableColumnHeader>
                ),
            },
            {
                accessorKey: 'total',
                header: ({ column, table }) => (
                    <SortableColumnHeader column={column} table={table}>
                        Total
                    </SortableColumnHeader>
                ),
                cell: ({ row }) => <PriceRepr value={row.getValue('total')} />,
            },
            {
                accessorKey: 'customerName',
                header: ({ column, table }) => (
                    <SortableColumnHeader column={column} table={table}>
                        Customer Name
                    </SortableColumnHeader>
                ),
            },
            {
                accessorKey: 'customerEmail',
                header: ({ column, table }) => (
                    <SortableColumnHeader column={column} table={table}>
                        Customer Email
                    </SortableColumnHeader>
                ),
            },
            {
                accessorKey: 'shippingAddress',
                header: 'Shipping Address',
            },
        ],
        'id',
        { sortable: true }
    )
