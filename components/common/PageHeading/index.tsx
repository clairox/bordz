type PageHeadingProps = React.PropsWithChildren

const PageHeading: React.FC<PageHeadingProps> = ({ children }) => {
    return (
        <div className="flex items-end px-6 pb-1 h-16 border-b border-black">
            <h1 className="text-2xl">{children}</h1>
        </div>
    )
}

export default PageHeading
