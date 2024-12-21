'use client'

import InfiniteItemList from '@/components/InfiniteItemList'
import { Table, TableCell, TableHeader, TableRow } from '@/components/Table'
import { useCustomers } from '@/hooks'

const CustomersPage = () => {
    const { data, hasNextPage, fetchNextPage } = useCustomers()

    return (
        <div>
            <h1>Customers</h1>
            <Table>
                <thead>
                    <tr>
                        <TableHeader>Name</TableHeader>
                        <TableHeader>Email</TableHeader>
                        <TableHeader>No. of Orders</TableHeader>
                        <TableHeader>Phone</TableHeader>
                        <TableHeader>Default Address</TableHeader>
                    </tr>
                </thead>
                <InfiniteItemList
                    pages={data.pages}
                    hasNextPage={hasNextPage}
                    fetchNextPage={fetchNextPage}
                    render={items => {
                        return <CustomerTableBody customers={items} />
                    }}
                />
            </Table>
        </div>
    )
}

type CustomerTableBodyProps = {
    customers: Customer[]
}

const CustomerTableBody: React.FC<CustomerTableBodyProps> = ({ customers }) => {
    return (
        <tbody>
            {customers.map(customer => {
                return (
                    <CustomerTableRow customer={customer} key={customer.id} />
                )
            })}
        </tbody>
    )
}

type CustomerTableRowProps = {
    customer: Customer
}

const CustomerTableRow: React.FC<CustomerTableRowProps> = ({ customer }) => {
    return (
        <TableRow>
            <TableCell>{customer.displayName}</TableCell>
            <TableCell>{customer.email}</TableCell>
            <TableCell>{customer.numberOfOrders}</TableCell>
            <TableCell>{customer.phone || ''}</TableCell>
            <TableCell>
                {customer.defaultAddress?.address.formatted || ''}
            </TableCell>
        </TableRow>
    )
}

export default CustomersPage
