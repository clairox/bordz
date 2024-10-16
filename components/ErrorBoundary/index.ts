'use client'

import React from 'react'

type ErrorBoundaryProps = React.PropsWithChildren<{
    fallback: React.ReactNode
}>

class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
    state = { hasError: false }

    static getDerivedStateFromError() {
        return { hasError: true }
    }

    render(): React.ReactNode {
        if (this.state.hasError) {
            return this.props.fallback
        }

        return this.props.children
    }
}

export default ErrorBoundary
