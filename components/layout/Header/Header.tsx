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
            <div className="flex gap-[1px] bg-black border-r border-black">
                <HeaderBrand />
                <HeaderLink href="/lab">Lab</HeaderLink>
                <HeaderLink href="/browse">Browse</HeaderLink>
            </div>
            <div className="flex gap-[1px] bg-black border-l border-black">
                <AccountHeaderButton />
                <WishlistHeaderButton />
                <CartHeaderButton />
            </div>
        </header>
    )
}
