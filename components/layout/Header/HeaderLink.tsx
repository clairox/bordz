import Link, { LinkProps } from 'next/link'

type HeaderLinkProps = React.PropsWithChildren<LinkProps>

export const HeaderLink: React.FC<HeaderLinkProps> = ({
    children,
    ...props
}) => {
    return (
        <Link
            {...props}
            className="flex justify-center items-center px-5 min-w-20 bg-white"
        >
            {children}
        </Link>
    )
}
