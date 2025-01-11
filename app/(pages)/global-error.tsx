'use client'

import { useEffect } from 'react'

type ErrorProps = {
    error: Error & { digest?: string }
}

const GlobalError: React.FC<ErrorProps> = ({ error }) => {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <html>
            <body>
                <div>
                    <h1>500</h1>
                    <h2>Something went wrong!</h2>
                    <p>
                        The server has encountered an unexpected error and was
                        unable to process your request. Please try again later.
                    </p>
                </div>
            </body>
        </html>
    )
}

export default GlobalError
