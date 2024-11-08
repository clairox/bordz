'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Url } from 'next/dist/shared/lib/router/router'
import { BagSimple, HeartStraight, User } from '@phosphor-icons/react/dist/ssr'

import { useCartQuery } from '@/context/cartContext'
import { useAuthQuery } from '@/context/authContext'

const Header: React.FC = () => {
    return (
        <header className="flex justify-between px-2 w-full">
            <div className="flex gap-4">
                <Link href="/">
                    <Image
                        src="/bordz-brand-black.svg"
                        alt="bordz"
                        width="122"
                        height="42"
                    />
                </Link>
                <Link href="/browse">Browse</Link>
            </div>
            <div className="flex gap-4">
                <AccountHeaderButton />
                <HeaderButton
                    href="/saved"
                    onClick={() => {}}
                    icon={<HeartStraight size={28} weight="light" />}
                />
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
        <Link href={href} onClick={handleClick}>
            <button disabled={disabled}>{icon}</button>
        </Link>
    )
}

const AccountHeaderButton: React.FC = () => {
    const { data: auth, status: authStatus } = useAuthQuery()

    return (
        <HeaderButton
            href={auth ? '/account' : '/login'}
            icon={
                <User
                    size={28}
                    weight="light"
                    color={authStatus === 'pending' ? '#999' : '#000'}
                />
            }
            disabled={authStatus === 'pending'}
        />
    )
}

const CartHeaderButton: React.FC = () => {
    const { data: cart } = useCartQuery()

    return (
        <HeaderButton
            href="/cart"
            icon={
                <div className="flex">
                    <BagSimple size={28} weight="light" />
                    {cart && <span>{cart.totalQuantity}</span>}
                </div>
            }
        />
    )
}

export default Header
