type SkateLabUIButtonProps = React.PropsWithChildren<{
    disabled?: boolean
    onClick: () => void
}>
const SkateLabUIButton: React.FC<SkateLabUIButtonProps> = ({
    children,
    disabled,
    onClick,
}) => {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={`w-32 h-12 border border-black pointer-events-auto ${disabled ? 'border-gray-400 bg-gray-100 text-gray-500' : 'hover:bg-gray-100'}`}
        >
            {children}
        </button>
    )
}

export default SkateLabUIButton
