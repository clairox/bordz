import Image from 'next/image'
import Link from 'next/link'

export const HeaderBrand = () => {
    return (
        <Link href="/" className="flex items-center px-4 bg-white">
            <Image
                src="/bordz-brand-black.svg"
                alt="bordz"
                width="122"
                height="42"
            />
        </Link>
    )
}
