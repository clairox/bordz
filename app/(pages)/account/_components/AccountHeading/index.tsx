const AccountHeading: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <div className="px-8 py-10 pb-6 border-b border-black">
            <h2 className="text-xl">{children}</h2>
        </div>
    )
}

export default AccountHeading
