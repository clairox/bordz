'use client'

import { useEffect } from 'react'

type ErrorProps = {
    error: Error & { digest?: string }
}

const ErrorBoundary = ({ error }: ErrorProps) => {
    useEffect(() => {
        console.error(error)
    }, [error])

    return <h1>Something went wrong!</h1>
}

export default ErrorBoundary
