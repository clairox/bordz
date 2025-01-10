'use client'

import { useSignOut } from '@/hooks/auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const AdminSidebar: React.FC = () => {
    const router = useRouter()
    const { mutate: signOut, isSuccess: isSignOutSuccess } = useSignOut()

    useEffect(() => {
        if (isSignOutSuccess) {
            router.push('/admin/login')
        }
    }, [isSignOutSuccess, router])

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
                <button onClick={() => signOut()}>Logout</button>
            </div>
        </div>
    )
}
