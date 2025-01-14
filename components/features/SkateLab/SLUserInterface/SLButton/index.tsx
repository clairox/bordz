import { Button } from '@/components/ui/Button'
import React from 'react'

type SLButtonProps = React.PropsWithChildren<{
    disabled?: boolean
    onClick: () => void
}>
const SLButton = React.forwardRef<HTMLButtonElement, SLButtonProps>(
    ({ children, disabled, onClick }, ref) => {
        return (
            <Button
                ref={ref}
                disabled={disabled}
                onClick={onClick}
                className={`w-32 h-12 pointer-events-auto`}
            >
                {children}
            </Button>
        )
    }
)

SLButton.displayName = 'SLButton'

export default SLButton
