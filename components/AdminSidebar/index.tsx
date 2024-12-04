import Link from 'next/link'

const AdminSidebar: React.FC = () => {
    return (
        <div>
            <div>
                <Link href="/admin/components">Components</Link>
            </div>
            <div>
                <Link href="/admin/products">Products</Link>
            </div>
            <div>
                <Link href="/admin/orders">Orders</Link>
            </div>
            <div>
                <Link href="/admin/customers">Customers</Link>
            </div>
        </div>
    )
}

export default AdminSidebar
