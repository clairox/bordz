'use client'

import { Check } from '@phosphor-icons/react'
import { ButtonHTMLAttributes, useMemo } from 'react'

type ButtonAsyncProps = React.PropsWithChildren<{
    type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
    loading: boolean
    success: boolean
}>

const ButtonAsync: React.FC<ButtonAsyncProps> = ({
    type,
    children,
    loading,
    success,
}) => {
    const content = useMemo(() => {
        if (loading) {
            return <div className="flex justify-center">Loading...</div>
        } else if (success) {
            return (
                <div className="flex justify-center">
                    <Check size={28} weight={'light'} />
                </div>
            )
        } else {
            return children
        }
    }, [children, loading, success])
    return (
        <button type={type} disabled={loading || success}>
            {content}
        </button>
    )
}

export default ButtonAsync
