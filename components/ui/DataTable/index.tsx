import {
    ColumnDef,
    SortingState,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getSortedRowModel,
    VisibilityState,
} from '@tanstack/react-table'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/Table'
import {
    FetchNextPageOptions,
    InfiniteData,
    InfiniteQueryObserverResult,
} from '@tanstack/react-query'
import { useCombinedPages } from '@/hooks/common'
import { useMemo, useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '../AlertDialog'

interface DataTableProps<TData extends object, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: Page<TData>[]
    hasNextPage: boolean
    fetchNextPage: (
        options?: FetchNextPageOptions
    ) => Promise<
        InfiniteQueryObserverResult<InfiniteData<Page<TData>, unknown>, Error>
    >
    deleteRows?: (ids: string[]) => Promise<void>
    autoFetch?: boolean
}

export function DataTable<TData extends object, TValue>({
    columns,
    data,
    hasNextPage,
    fetchNextPage,
    deleteRows,
    autoFetch = false, // TODO: automatically fetchNextPage upon scrolling to bottom
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [rowSelection, setRowSelection] = useState({})
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
        pk: false,
    })

    const items = useCombinedPages(data)
    const table = useReactTable({
        data: items,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onRowSelectionChange: setRowSelection,
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            rowSelection,
            columnVisibility,
        },
    })

    const selectedRowCount = useMemo(
        () => Object.keys(rowSelection).length,
        [rowSelection]
    )

    const handleDeleteSelectedRows = async () => {
        if (!deleteRows) {
            return
        }

        const ids = table
            .getFilteredSelectedRowModel()
            .rows.map(row => row.getValue('pk'))
            .filter(id => id !== undefined) as string[]
        await deleteRows(ids)
        setRowSelection({})
    }

    return (
        <div className="rounded-md border">
            {selectedRowCount > 0 && deleteRows && (
                <AlertDialog>
                    <AlertDialogTrigger>
                        Delete {selectedRowCount} rows
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Confirm Deletion
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure you want to delete{' '}
                                {selectedRowCount} rows?
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={handleDeleteSelectedRows}
                            >
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map(header => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map(row => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && 'selected'}
                            >
                                {row.getVisibleCells().map(cell => (
                                    <TableCell key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center"
                            >
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {hasNextPage && (
                <button onClick={() => fetchNextPage()}>Load more</button>
            )}
        </div>
    )
}
