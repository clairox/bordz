import { AdminSidebar } from './_components'

const AdminLayout: React.FC<React.PropsWithChildren> = async ({ children }) => {
    return (
        <div className="grid grid-cols-12">
            <aside className="col-span-2">
                <AdminSidebar />
            </aside>
            <main className="col-span-10 w-full">{children}</main>
        </div>
    )
}

export default AdminLayout
