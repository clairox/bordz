'use client'

import { usePathname, useRouter } from 'next/navigation'

import Link from 'next/link'
import { useEffect } from 'react'
import { useSignOut } from '@/hooks'

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
        <aside className="flex flex-col h-full border-r border-black">
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
            <SidebarMenuItem href="/saved">Saved</SidebarMenuItem>
            <SidebarMenuItem
                href="/account/change-password"
                isSelected={pathname === '/account/change-password'}
            >
                Change Password
            </SidebarMenuItem>
            <div className="py-2 border-b border-black bg-white hover:bg-gray-200">
                <button
                    onClick={() => signOut()}
                    className="w-full h-full text-left"
                >
                    Logout
                </button>
            </div>
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
                className={`py-2 border-b border-black bg-white hover:bg-gray-200  ${isSelected && 'font-semibold'}`}
            >
                {children}
            </div>
        </Link>
    )
}

export default AccountSidebar
