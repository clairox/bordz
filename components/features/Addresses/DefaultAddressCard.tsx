'use client'

import { useRouter } from 'next/navigation'

import { AddressCard } from './AddressCard'

type DefaultAddressCardProps = {
    defaultAddress?: Address
}

export const DefaultAddressCard: React.FC<DefaultAddressCardProps> = ({
    defaultAddress,
}) => {
    const router = useRouter()

    return (
        <div className="flex flex-col justify-between w-1/2 border-r border-black">
            {defaultAddress ? (
                <div>
                    <p className="font-semibold">Default address:</p>
                    <AddressCard address={defaultAddress} />
                </div>
            ) : (
                <p>No default address saved.</p>
            )}
            <button
                onClick={() => router.push('/account/addresses/edit-default')}
            >
                Update default address
            </button>
        </div>
    )
}
