'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LinkToSignup = () => {
    const pathname = usePathname()
    return (
        <p>
            {"Don't have an account? "}
            <Link href={pathname + '?register=true'}>Sign up</Link>
        </p>
    )
}

export default LinkToSignup
