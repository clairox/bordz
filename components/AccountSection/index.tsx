import Link, { LinkProps } from 'next/link'
import { ComponentPropsWithoutRef } from 'react'

const AccountSection = ({ children }: React.PropsWithChildren) => {
    return (
        <div className="px-8 py-5 w-full border-b border-black">{children}</div>
    )
}

const AccountSectionHeader = ({ children }: React.PropsWithChildren) => {
    return (
        <div className="relative flex justify-between pt-2 pb-6">
            {children}
        </div>
    )
}

const AccountSectionTitle = ({
    children,
    ...props
}: React.PropsWithChildren<ComponentPropsWithoutRef<'h2'>>) => {
    return (
        <h3 {...props} className="text-lg">
            {children}
        </h3>
    )
}

const AccountSectionActionLink = ({
    children,
    ...props
}: React.PropsWithChildren<LinkProps>) => {
    return (
        <Link {...props} className="absolute right-0 top-0">
            {children}
        </Link>
    )
}

const AccountSectionContent = ({ children }: React.PropsWithChildren) => {
    return <div>{children}</div>
}

AccountSection.Header = AccountSectionHeader
AccountSection.Content = AccountSectionContent

AccountSectionHeader.Title = AccountSectionTitle
AccountSectionHeader.ActionLink = AccountSectionActionLink

export default AccountSection
