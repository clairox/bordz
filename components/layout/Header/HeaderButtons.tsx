'use client'

import Link from 'next/link'
import { BagSimple, HeartStraight, User } from '@phosphor-icons/react'

import { useCartQuery } from '@/context/CartContext'
import { useCustomer } from '@/context/CustomerContext'
import { useWishlist } from '@/context/WishlistContext'

const iconSize = 26

const AccountHeaderButton: React.FC = () => {
    const { data: customer, isPending: isCustomerPending } = useCustomer()

    return (
        <Link
            href={customer ? '/account' : '/login'}
            className="flex justify-center items-center px-5 bg-white"
        >
            <button disabled={isCustomerPending}>
                <div className="flex justify-center items-center gap-3">
                    <User
                        size={iconSize}
                        weight="light"
                        color={isCustomerPending ? '#999' : '#000'}
                    />
                    {customer && <span>{customer.firstName}</span>}
                </div>
            </button>
        </Link>
    )
}

type HeaderButtonWithCountProps = {
    href: string
    icon: React.ReactNode
    count?: number
    hideZero?: boolean
    disabled?: boolean
    onClick?: () => Promise<void>
}

const HeaderButtonWithCount: React.FC<HeaderButtonWithCountProps> = ({
    href,
    icon,
    count = 0,
    hideZero = false,
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
            <button disabled={disabled}>
                <div
                    className={`flex justify-center items-center gap-1 ${disabled ? 'text-gray-400' : 'text-black'}`}
                >
                    {icon}
                    {!(hideZero && count === 0) && (
                        <span
                            className={`w-4 text-[22px]/[30px] font-extralight`}
                        >
                            {count}
                        </span>
                    )}
                </div>
            </button>
        </Link>
    )
}

const WishlistHeaderButton: React.FC = () => {
    const { data: wishlist } = useWishlist()

    return (
        <HeaderButtonWithCount
            href="/saved"
            icon={<HeartStraight size={iconSize} weight="light" />}
            count={wishlist && wishlist.quantity}
            disabled={!wishlist}
        />
    )
}

const CartHeaderButton: React.FC = () => {
    const { data: cart } = useCartQuery()

    return (
        <HeaderButtonWithCount
            href="/cart"
            icon={<BagSimple size={iconSize} weight="light" />}
            count={cart && cart.totalQuantity}
            disabled={!cart}
        />
    )
}

export { AccountHeaderButton, WishlistHeaderButton, CartHeaderButton }
