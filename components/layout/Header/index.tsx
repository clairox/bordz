'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Url } from 'next/dist/shared/lib/router/router'
import { BagSimple, HeartStraight, User } from '@phosphor-icons/react/dist/ssr'

import { useCartQuery } from '@/context/CartContext'
import { useCustomer } from '@/context/CustomerContext'
import { useWishlist } from '@/context/WishlistContext'

const Header: React.FC = () => {
    return (
        <header className="z-50 fixed top-0 left-0 flex justify-between w-full h-14 border-b border-black bg-white">
            <div className="flex gap-[1px] bg-black border-r border-black">
                <Link href="/" className="flex items-center px-4 bg-white">
                    <Image
                        src="/bordz-brand-black.svg"
                        alt="bordz"
                        width="122"
                        height="42"
                    />
                </Link>
                <Link
                    href="/lab"
                    className="flex justify-center items-center w-24 bg-white"
                >
                    Lab
                </Link>
                <Link
                    href="/browse"
                    className="flex justify-center items-center w-24 bg-white"
                >
                    Browse
                </Link>
            </div>
            <div className="flex gap-[1px] bg-black border-l border-black">
                <AccountHeaderButton />
                <WishlistHeaderButton />
                <CartHeaderButton />
            </div>
        </header>
    )
}

type HeaderButtonProps = {
    icon: React.ReactNode
    href: Url
    disabled?: boolean
    onClick?: () => void
}

const HeaderButton: React.FC<HeaderButtonProps> = ({
    icon,
    href,
    disabled = false,
    onClick,
}) => {
    const handleClick = (
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
        if (!onClick) {
            return
        }

        e.preventDefault()

        onClick()
    }

    return (
        <Link
            href={href}
            onClick={handleClick}
            className="flex justify-center items-center px-5 bg-white"
        >
            <button disabled={disabled}>{icon}</button>
        </Link>
    )
}

const AccountHeaderButton: React.FC = () => {
    const { data: customer, isPending: isCustomerPending } = useCustomer()

    return (
        <HeaderButton
            href={customer ? '/account' : '/login'}
            icon={
                <div className="flex items-center gap-3">
                    <User
                        size={26}
                        weight="light"
                        color={isCustomerPending ? '#999' : '#000'}
                    />
                    {customer && <span>{customer.firstName}</span>}
                </div>
            }
            disabled={isCustomerPending}
        />
    )
}

const WishlistHeaderButton: React.FC = () => {
    const { data: wishlist } = useWishlist()

    return (
        <HeaderButton
            href="/saved"
            icon={
                <div className="flex items-center gap-2">
                    <HeartStraight size={26} weight="light" />
                    {wishlist && (
                        <span className="w-4 text-2xl font-[200]">
                            {wishlist.quantity}
                        </span>
                    )}
                </div>
            }
        />
    )
}

const CartHeaderButton: React.FC = () => {
    const { data: cart } = useCartQuery()

    return (
        <HeaderButton
            href="/cart"
            icon={
                <div className="flex items-center gap-2">
                    <BagSimple size={26} weight="light" />
                    {cart && (
                        <span className="w-4 text-2xl font-[200]">
                            {cart.totalQuantity}
                        </span>
                    )}
                </div>
            }
        />
    )
}

export default Header
