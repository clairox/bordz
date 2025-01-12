'use client'

import { useEffect, useState } from 'react'
import { HeartStraight } from '@phosphor-icons/react'

type WishlistButtonProps = {
    isInWishlist: boolean
    onToggle: () => void
}

const WishlistButton: React.FC<WishlistButtonProps> = ({
    isInWishlist,
    onToggle,
}) => {
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(false)
    }, [isInWishlist])

    const handleClick = () => {
        onToggle()
        setLoading(true)
    }

    return (
        <button disabled={loading} onClick={handleClick}>
            <HeartStraight size={26} weight={isInWishlist ? 'fill' : 'light'} />
        </button>
    )
}

export default WishlistButton
