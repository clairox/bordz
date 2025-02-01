'use client'

import { usePathname } from 'next/navigation'

import { AccountSidebarMenuLogoutButton } from './AccountSidebarLogoutButton'
import { AccountSidebarMenuItem } from './AccountSidebarMenuItem'

export const AccountSidebarMenu = () => {
    const pathname = usePathname()

    return (
        <div className="flex flex-col h-full">
            <AccountSidebarMenuItem
                href="/account/settings"
                isSelected={pathname === '/account/settings'}
            >
                Settings
            </AccountSidebarMenuItem>
            <AccountSidebarMenuItem
                href="/account/orders"
                isSelected={pathname === '/account/orders'}
            >
                Orders
            </AccountSidebarMenuItem>
            <AccountSidebarMenuItem
                href="/account/personal-details"
                isSelected={pathname === '/account/personal-details'}
            >
                Personal Details
            </AccountSidebarMenuItem>
            <AccountSidebarMenuItem
                href="/account/addresses"
                isSelected={pathname === '/account/addresses'}
            >
                Shipping Addresses
            </AccountSidebarMenuItem>
            <AccountSidebarMenuItem href="/wishlist">
                Saved
            </AccountSidebarMenuItem>
            <AccountSidebarMenuItem
                href="/account/change-password"
                isSelected={pathname === '/account/change-password'}
            >
                Change Password
            </AccountSidebarMenuItem>
            <AccountSidebarMenuLogoutButton />
        </div>
    )
}
