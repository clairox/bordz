'use client'
import React from 'react'

class ErrorBoundary extends React.Component {
    state = { hasError: false }

    static getDerivedStateFromError(error: Error) {
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
