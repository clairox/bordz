'use client'

import { useMemo } from 'react'
import { Column, Table } from '@tanstack/react-table'
import { ArrowDown, ArrowUp } from '@phosphor-icons/react'

type SortableColumnHeaderProps<TData extends object> = {
    column: Column<TData, unknown>
    table: Table<TData>
}

const SortableColumnHeader = <TData extends object>({
    column,
    table,
    children,
}: React.PropsWithChildren<SortableColumnHeaderProps<TData>>) => {
    const tableState = table.getState()
    const arrow = useMemo(() => {
        const size = 14
        if (column.getIsSorted() === 'asc') {
            return <ArrowUp color="black" size={size} weight="light" />
        }

        if (column.getIsSorted() === 'desc') {
            return <ArrowDown color="black" size={size} weight="light" />
        }
    }, [column, tableState.sorting])

    return (
        <button
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="flex gap-1 items-center"
        >
            {children}
            {arrow}
        </button>
    )
}

export default SortableColumnHeader
