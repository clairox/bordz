'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'

import { useSignOut } from '@/hooks/auth'

const AccountSidebar = () => {
    const router = useRouter()
    const pathname = usePathname()
    const { mutate: signOut, isSuccess: isSignOutSuccess } = useSignOut()

    useEffect(() => {
        if (isSignOutSuccess) {
            router.push('/login')
        }
    }, [isSignOutSuccess, router])

    return (
        <aside className="flex flex-col h-full border-r border-b border-black">
            <SidebarMenuItem
                href="/account/settings"
                isSelected={pathname === '/account/settings'}
            >
                Settings
            </SidebarMenuItem>
            <SidebarMenuItem
                href="/account/orders"
                isSelected={pathname === '/account/orders'}
            >
                Orders
            </SidebarMenuItem>
            <SidebarMenuItem
                href="/account/personal-details"
                isSelected={pathname === '/account/personal-details'}
            >
                Personal Details
            </SidebarMenuItem>
            <SidebarMenuItem
                href="/account/addresses"
                isSelected={pathname === '/account/addresses'}
            >
                Shipping Addresses
            </SidebarMenuItem>
            <SidebarMenuItem href="/wishlist">Saved</SidebarMenuItem>
            <SidebarMenuItem
                href="/account/change-password"
                isSelected={pathname === '/account/change-password'}
            >
                Change Password
            </SidebarMenuItem>
            <button
                onClick={() => signOut()}
                className="px-6 py-4 border-b border-black bg-white hover:bg-gray-200 text-left"
            >
                Logout
            </button>
        </aside>
    )
}

type SidebarMenuItemProps = React.PropsWithChildren<{
    href: string
    isSelected?: boolean
}>

const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({
    children,
    href,
    isSelected = false,
}) => {
    return (
        <Link href={href}>
            <div
                className={`px-6 py-4 border-b border-gray-400 bg-white hover:bg-gray-200  ${
                    isSelected && 'font-semibold'
                }`}
            >
                {children}
            </div>
        </Link>
    )
}

export { AccountSidebar }
