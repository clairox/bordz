import { Button } from '@/components/ui/Button'

type SLButtonProps = React.PropsWithChildren<{
    disabled?: boolean
    onClick: () => void
}>
const SLButton: React.FC<SLButtonProps> = ({ children, disabled, onClick }) => {
    return (
        <Button
            disabled={disabled}
            onClick={onClick}
            className={`w-32 h-12 pointer-events-auto`}
        >
            {children}
        </Button>
    )
}

export default SLButton
