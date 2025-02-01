import Link from 'next/link'

type SidebarMenuItemProps = React.PropsWithChildren<{
    href: string
    isSelected?: boolean
}>

export const AccountSidebarMenuItem: React.FC<SidebarMenuItemProps> = ({
    children,
    href,
    isSelected = false,
}) => {
    return (
        <Link href={href}>
            <div
                className={`px-6 py-4 border-b border-gray-400 bg-white hover:bg-gray-200  ${
                    isSelected && 'font-semibold'
                }`}
            >
                {children}
            </div>
        </Link>
    )
}
