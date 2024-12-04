'use client'

import { useRouter } from 'next/navigation'

import { useSupabase } from '@/context/SupabaseContext'

const AccountSidebar = () => {
    const { auth } = useSupabase()
    const router = useRouter()

    const handleSignOut = async () => {
        const { error } = await auth.signOut()

        if (error) {
            console.error(error)
        } else {
            router.push('/login')
        }
    }

    return (
        <aside>
            <button onClick={handleSignOut}>Logout</button>
        </aside>
    )
}

export default AccountSidebar
