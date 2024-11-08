'use client'

import { Check } from '@phosphor-icons/react'
import { useMemo } from 'react'

type ButtonAsyncProps = React.PropsWithChildren<{
    loading: boolean
    success: boolean
}>

const ButtonAsync: React.FC<ButtonAsyncProps> = ({
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
    return <button disabled={loading || success}>{content}</button>
}

export default ButtonAsync