'use client'

import Image from 'next/image'
import Link from 'next/link'
import { BagSimple, HeartStraight, User } from '@phosphor-icons/react/dist/ssr'

import { useCartQuery } from '@/context/cartContext'

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
                <HeaderButton
                    onClick={() => {}}
                    icon={<User size={28} weight="light" />}
                />
                <HeaderButton
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
    onClick: () => void
}

const HeaderButton: React.FC<HeaderButtonProps> = ({ icon, onClick }) => {
    return <button onClick={onClick}>{icon}</button>
}

const CartHeaderButton: React.FC = () => {
    const { data: cart } = useCartQuery()

    return (
        <Link href={'/cart'}>
            <HeaderButton
                onClick={() => {}}
                icon={
                    <div className="flex">
                        <BagSimple size={28} weight="light" />
                        {cart && <span>{cart.totalQuantity}</span>}
                    </div>
                }
            />
        </Link>
    )
}

export default Header
