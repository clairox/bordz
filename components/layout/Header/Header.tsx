import Image from 'next/image'
import Link from 'next/link'
import {
    AccountHeaderButton,
    CartHeaderButton,
    WishlistHeaderButton,
} from './HeaderButtons'

export const Header: React.FC = () => {
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
