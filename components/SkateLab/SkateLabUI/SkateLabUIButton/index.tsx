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
            className="pointer-events-auto"
        >
            {children}
        </button>
    )
}

export default SkateLabUIButton
