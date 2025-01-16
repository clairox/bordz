import { HeaderBrand } from './HeaderBrand'
import {
    AccountHeaderButton,
    CartHeaderButton,
    WishlistHeaderButton,
} from './HeaderButtons'
import { HeaderLink } from './HeaderLink'

export const Header: React.FC = () => {
    return (
        <header className="z-50 fixed top-0 left-0 flex justify-between w-full h-14 border-b border-black bg-white">
            <div className="flex-1 w-full">
                <div className="flex gap-[1px] w-fit h-full bg-gray-400 border-r border-gray-400">
                    <HeaderLink href="/lab">Lab</HeaderLink>
                    <HeaderLink href="/browse">Browse</HeaderLink>
                </div>
            </div>
            <div className="flex justify-center">
                <HeaderBrand />
            </div>
            <div className="flex-1 flex justify-end w-full">
                <div className="flex gap-[1px] w-fit h-full bg-gray-400 border-l border-gray-400">
                    <AccountHeaderButton />
                    <WishlistHeaderButton />
                    <CartHeaderButton />
                </div>
            </div>
        </header>
    )
}
