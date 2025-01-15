export const AccountHeading: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    return (
        <div className="px-8 py-10 pb-2 border-b border-black">
            <div className="w-fit">
                <h2 className="px-1 text-2xl">{children}</h2>
                <div className="relative top-2 w-full h-[2px] bg-black" />
            </div>
        </div>
    )
}
