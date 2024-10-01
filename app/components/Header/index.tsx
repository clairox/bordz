'use client'
import Image from 'next/image'
import Link from 'next/link'
import { BagSimple, HeartStraight, User } from '@phosphor-icons/react/dist/ssr'
import brandLogo from '@/app/bordz-brand-black.svg'

const Header: React.FC = () => {
    return (
        <header className="flex justify-between w-full">
            <div>
                <Link href="/">
                    <Image
                        src={brandLogo}
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
                <HeaderButton
                    onClick={() => {}}
                    icon={<BagSimple size={28} weight="light" />}
                />
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

export default Header
