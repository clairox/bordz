'use client'
import { useAccountContext } from '@/context/AccountContext/AccountContext'
import { logout } from '@/lib/auth'
import { HeartStraight, House, Lock, Package, SignOut, Gear, User } from '@phosphor-icons/react'
import Link from 'next/link'
import React from 'react'

const AccountSidebar = () => {
	const handleLogout = async () => {
		const { success } = await logout()
		if (success) {
			window.location.href = '/'
		}
	}

	const { customer } = useAccountContext()

	return (
		<div className="col-span-4 flex flex-col">
			<div className="flex items-center px-5 h-24 border border-t-0 border-black text-3xl font-bold tracking-wider">
				<h1>
					Hey,
					<br />
					{customer.firstName}!
				</h1>
			</div>
			<Link
				className="flex items-center gap-3 px-5 h-16 border border-t-0 border-black hover:bg-gray-100"
				href="/account/settings"
			>
				<Gear size={28} weight="light" />
				Settings
			</Link>
			<Link
				className="flex items-center gap-3 px-5 h-16 border border-t-0 border-black hover:bg-gray-100"
				href="/account/orders"
			>
				<Package size={28} weight="light" />
				Orders
			</Link>
			<Link
				className="flex items-center gap-3 px-5 h-16 border border-t-0 border-black hover:bg-gray-100"
				href="/account/personal-info"
			>
				<User size={28} weight="light" />
				Personal Info
			</Link>
			<Link
				className="flex items-center gap-3 px-5 h-16 border border-t-0 border-black hover:bg-gray-100"
				href="/wishlist"
			>
				<HeartStraight size={28} weight="light" />
				Wishlist
			</Link>
			<Link
				className="flex items-center gap-3 px-5 h-16 border border-t-0 border-black hover:bg-gray-100"
				href="/account/addresses"
			>
				<House size={28} weight="light" />
				Shipping Addresses
			</Link>
			<Link
				className="flex items-center gap-3 px-5 h-16 border border-t-0 border-black hover:bg-gray-100"
				href="/account/change-password"
			>
				<Lock size={28} weight="light" />
				Change Password
			</Link>
			<button
				className="flex items-center gap-3 px-5 h-16 border border-t-0 border-black hover:bg-gray-100"
				onClick={handleLogout}
			>
				<SignOut size={28} weight="light" />
				Logout
			</button>
		</div>
	)
}

export default AccountSidebar
