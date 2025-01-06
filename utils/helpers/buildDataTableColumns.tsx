import { ColumnDef } from '@tanstack/react-table'

type BuildDataTableColumnsOptions = {
    sortable?: boolean
}

const buildDataTableColumns = <TData extends object>(
    columns: ColumnDef<TData>[],
    primaryKey?: keyof TData,
    options?: BuildDataTableColumnsOptions
): ColumnDef<TData>[] => {
    const _columns = columns

    if (primaryKey) {
        _columns.unshift({
            id: 'pk',
            accessorKey: primaryKey,
        } as ColumnDef<TData>)
    }

    if (options?.sortable) {
        _columns.unshift({
            id: 'select',
            header: ({ table }) => (
                <input
                    type="checkbox"
                    checked={table.getIsAllPageRowsSelected()}
                    onChange={e =>
                        table.toggleAllPageRowsSelected(e.target.checked)
                    }
                />
            ),
            cell: ({ row }) => (
                <input
                    type="checkbox"
                    checked={row.getIsSelected()}
                    onChange={e => row.toggleSelected(e.target.checked)}
                />
            ),
            enableSorting: false,
            enableHiding: false,
        } as ColumnDef<TData>)
    }

    return _columns
}

export default buildDataTableColumns
