'use client'

import { useSupabase } from '@/context/SupabaseContext'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const AdminSidebar: React.FC = () => {
    const supabase = useSupabase()
    const router = useRouter()

    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut()

        if (error) {
            console.error(error)
        } else {
            router.push('/admin/login')
        }
    }

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
            <div>
                <button onClick={handleSignOut}>Logout</button>
            </div>
        </div>
    )
}

export default AdminSidebar
