'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LinkToLogin = () => {
    const pathname = usePathname()
    return (
        <p>
            {'Already have an account? '}
            <Link href={pathname}>Log in</Link>
        </p>
    )
}

export default LinkToLogin
