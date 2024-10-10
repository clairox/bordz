'use client'
import Image from 'next/image'
import Link from 'next/link'
import { BagSimple, HeartStraight, User } from '@phosphor-icons/react/dist/ssr'
import { useCartQuery } from '@/hooks'
import { CartProvider } from '@/providers/Cart'

const Header: React.FC = () => {
    return (
        <header className="flex justify-between w-full">
            <div>
                <Link href="/">
                    <Image
                        src="/bordz-brand-black.svg"
                        alt="bordz"
                        width="122"
                        height="42"
                    />
                </Link>
            </div>
            <div className="flex">
                <HeaderButton
                    onClick={() => {}}
                    icon={<User size={28} weight="light" />}
                />
                <HeaderButton
                    onClick={() => {}}
                    icon={<HeartStraight size={28} weight="light" />}
                />
                <CartProvider>
                    <CartHeaderButton />
                </CartProvider>
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
