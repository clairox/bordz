import { AccountSidebarHeader } from './AccountSidebarHeader'
import { AccountSidebarMenu } from './AccountSidebarMenu'

export const AccountSidebar = () => {
    return (
        <aside className="flex flex-col h-full border-r border-b border-black">
            <AccountSidebarHeader />
            <AccountSidebarMenu />
        </aside>
    )
}
