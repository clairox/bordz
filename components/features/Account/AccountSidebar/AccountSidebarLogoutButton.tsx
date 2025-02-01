import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { useSignOut } from '@/hooks/auth'

export const AccountSidebarMenuLogoutButton = () => {
    const router = useRouter()
    const signOut = useSignOut()

    useEffect(() => {
        if (signOut.isSuccess) {
            router.push('/login')
        }
    }, [signOut.isSuccess, router])

    return (
        <button
            onClick={() => signOut.mutate()}
            className="px-6 py-4 border-b border-black bg-white hover:bg-gray-200 text-left"
        >
            Logout
        </button>
    )
}
