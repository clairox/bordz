import Link from 'next/link'
import { ColumnDef } from '@tanstack/react-table'

import PriceRepr from '@/components/PriceRepr'
import SortableColumnHeader from '@/components/SortableColumnHeader'
import buildDataTableColumns from '@/utils/helpers/buildDataTableColumns'

export const orderTableColumns: ColumnDef<Order>[] = buildDataTableColumns(
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
            accessorKey: 'customer.displayName',
            header: ({ column, table }) => (
                <SortableColumnHeader column={column} table={table}>
                    Customer Name
                </SortableColumnHeader>
            ),
        },
        {
            accessorKey: 'customer.email',
            header: ({ column, table }) => (
                <SortableColumnHeader column={column} table={table}>
                    Customer Email
                </SortableColumnHeader>
            ),
        },
        {
            accessorKey: 'shippingAddress.formatted',
            header: 'Shipping Address',
        },
    ],
    'id',
    { sortable: true }
)
