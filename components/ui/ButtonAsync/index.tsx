'use client'

import { ButtonHTMLAttributes, useEffect, useState } from 'react'
import { Check } from '@phosphor-icons/react'
import { Button } from '../Button'

type ButtonAsyncProps = React.PropsWithChildren<{
    type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
    loading: boolean
    success: boolean
    shouldReset?: boolean
}>

const ButtonAsync: React.FC<ButtonAsyncProps> = ({
    type,
    children,
    loading,
    success,
    shouldReset = false,
}) => {
    const [content, setContent] = useState<React.ReactNode>(children)
    const [disabled, setDisabled] = useState(false)

    useEffect(() => {
        if (!loading && !success) {
            setContent(children)
            setDisabled(false)
        }
    }, [loading, success, children])

    useEffect(() => {
        if (loading) {
            setContent(<div>Loading...</div>)
            setDisabled(true)
        }
    }, [loading])

    useEffect(() => {
        if (success) {
            setContent(<Check size={20} weight="bold" />)

            if (shouldReset) {
                setTimeout(() => {
                    setContent(children)
                    setDisabled(false)
                }, 3000)
            }
        }
    }, [success, children, shouldReset])

    return (
        <Button type={type} disabled={disabled} className="w-fit">
            {content}
        </Button>
    )
}

export default ButtonAsync
