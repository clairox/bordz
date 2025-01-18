'use client'

import { useRouter } from 'next/navigation'

import { AddressCard } from './AddressCard'
import { Button } from '@/components/ui/Button'

type DefaultAddressCardProps = {
    defaultAddress?: Address
}

export const DefaultAddressCard: React.FC<DefaultAddressCardProps> = ({
    defaultAddress,
}) => {
    const router = useRouter()

    return (
        <div className="flex flex-col justify-between w-1/2">
            {defaultAddress ? (
                <div>
                    <p className="font-semibold">Default address:</p>
                    <AddressCard address={defaultAddress} />
                </div>
            ) : (
                <p>No default address saved.</p>
            )}
            <Button
                onClick={() => router.push('/account/addresses/edit-default')}
                className="mt-4 w-fit"
            >
                Update default address
            </Button>
        </div>
    )
}
