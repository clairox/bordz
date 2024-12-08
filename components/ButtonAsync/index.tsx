'use client'

import { ButtonHTMLAttributes, useEffect, useState } from 'react'
import { Check } from '@phosphor-icons/react'

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
    const [content, setContent] = useState<React.ReactNode>(children)
    const [disabled, setDisabled] = useState(false)

    useEffect(() => {
        if (loading) {
            setContent(<div className="flex justify-center">Loading...</div>)
            setDisabled(true)
        }
    }, [loading])

    useEffect(() => {
        if (success) {
            setContent(
                <div className="flex justify-center">
                    <Check size={28} weight={'light'} />
                </div>
            )
            setTimeout(() => {
                setContent(children)
                setDisabled(false)
            }, 3000)
        }
    }, [success, children])

    return (
        <button type={type} disabled={disabled}>
            {content}
        </button>
    )
}

export default ButtonAsync
